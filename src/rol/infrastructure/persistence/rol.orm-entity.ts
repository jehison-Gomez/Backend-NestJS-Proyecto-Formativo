import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('rol')
export class RolOrmEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id_rol: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  descripcion: string;

  @Column('text')
  nivel_acceso: string;

  @Column('text')
  activo: string;

  @Column('text')
  id_usuario: string;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
    this.descripcion = this.descripcion.trim().toLowerCase();
  }
}