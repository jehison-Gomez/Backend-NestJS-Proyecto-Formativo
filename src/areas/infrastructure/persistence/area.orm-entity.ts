import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { SiteOrmEntity } from "src/sites/infrastructure/persistence/site.orm-entity";

@Entity('area')
export class AreaOrmEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    name: string;

    @Column('uuid')
    site_id: string;

    @ManyToOne(() => SiteOrmEntity, (site) => site.areas, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'site_id' })
    site: SiteOrmEntity;

    @BeforeInsert()
    @BeforeUpdate()
    checkName() {
        this.name = this.name.trim().toLowerCase();
        // Cualquier transformacion antes de guardar
    }
}