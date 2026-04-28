import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('fichas')
export class FichaOrmEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id_ficha: string;

  @Column('text', { unique: true })
  codigo_ficha: string;

  @Column('text', { unique: true })
  fecha_inicio: Date;

  @Column('text')
  fecha_fin: Date;

  @Column('text')
  estado: string;

  @Column('text')
  id_programa: string;

  @Column('text')
  id_usuario_lider: string;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.codigo_ficha = this.codigo_ficha.trim().toLowerCase();
    // this.codigo = this.codigo.trim().toLowerCase();
  }
}