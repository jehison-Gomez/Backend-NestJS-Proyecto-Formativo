import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { SiteOrmEntity } from "src/sites/infrastructure/persistence/site.orm-entity";
import { ProgramOrmEntity } from "src/programs/infrastructure/persistence/program.orm-entity";
import { SpaceOrmEntity } from "src/spaces/infrastructure/persistence/space.orm-entity";

@Entity('areas')
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

    @OneToMany(() => ProgramOrmEntity, (program) => program.area)
    programs: ProgramOrmEntity[];

    @OneToMany(() => SpaceOrmEntity, (space) => space.area)
    spaces: SpaceOrmEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    checkName() {
        this.name = this.name.trim().toLowerCase();
        // Cualquier transformacion antes de guardar
    }
}