import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('programas')
export class ProgramaOrmEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id_programa: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  codigo: string;

  @Column('text')
  nivel_formacion: string;

  @Column('text')
  estado: string;

  @Column('text')
  id_area: string;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
    this.codigo = this.codigo.trim().toLowerCase();
  }
}