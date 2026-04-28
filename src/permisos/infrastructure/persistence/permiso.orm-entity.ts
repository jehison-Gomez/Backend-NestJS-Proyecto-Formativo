import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('permisos')
export class PermisoOrmEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id_permiso: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  descripcion: string;

  @Column('text')
  modulo: string;

  @Column('text')
  accion: string;

  @Column('text')
  activo: string;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
    this.descripcion = this.descripcion.trim().toLowerCase();
  }
}