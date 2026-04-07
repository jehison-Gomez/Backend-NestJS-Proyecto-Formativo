import { DepartmentOrmEntity } from 'src/departments/infrastructure/persistence/departamento.orm-entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('region')
export class RegionOrmEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    name: string;
    
    @OneToMany(() => DepartmentOrmEntity, (department) => department.region)
    departments: DepartmentOrmEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    checkName() {
        this.name = this.name.trim().toLowerCase();
        // Cualquier transformacion antes de guardar
    }
}

// Aquí vive lo de TypeORM, aislado del dominio
