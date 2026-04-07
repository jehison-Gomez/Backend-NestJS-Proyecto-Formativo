import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    @BeforeInsert()
    @BeforeUpdate()
    checkName() {
        this.name = this.name.trim().toLowerCase();
        // Cualquier transformacion antes de guardar
    }
}

// Aquí vive lo de TypeORM, aislado del dominio
