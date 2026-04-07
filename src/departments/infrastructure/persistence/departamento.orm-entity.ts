import { RegionOrmEntity } from 'src/regions/infrastructure/persistence/region.orm-entity';
import { CenterOrmEntity } from 'src/centers/infrastructure/persistence/center.orm-entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departments')
export class DepartmentOrmEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    name: string;

    @Column('uuid')
    region_id: string;

    @ManyToOne(() => RegionOrmEntity, (region) => region.departments, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'region_id' })
    region: RegionOrmEntity;

    @OneToMany(() => CenterOrmEntity, (center) => center.department)
    centers: CenterOrmEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    checkName() {
        this.name = this.name.trim().toLowerCase();
        // Cualquier transformacion antes de guardar
    }
}

// Aquí vive lo de TypeORM, aislado del dominio
