import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('usuarios')
export class UsuarioOrmEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  correo: string;

  @Column('text')
  contrasena: string;

  @Column('text')
  telefono: string;

  @Column('text')
  documento: string;

  @Column('text')
  estado: string;
  
  @Column('text')
  fecha_registro: Date;
  
  @Column('text')
  ultimo_acceso: Date;
  
  @Column('text')
  id_ficha: string;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
    this.contrasena = this.contrasena.trim().toLowerCase();
  }
}