import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DepartmentOrmEntity } from 'src/departments/infrastructure/persistence/departamento.orm-entity';

@Entity('center')
export class CenterOrmEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    center_code: string;

    @Column('text', { unique: true })
    name: string;
    
    @Column('text')
    address: string;

    @Column('uuid')
    department_id: string;

    @ManyToOne(() => DepartmentOrmEntity, (department) => department.centers, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'department_id' })
    department: DepartmentOrmEntity;

    @BeforeInsert()
    @BeforeUpdate()
    checkName() {
        this.name = this.name.trim().toLowerCase();
        // Cualquier transformacion antes de guardar
    }
}

// Aquí vive lo de TypeORM, aislado del dominio
