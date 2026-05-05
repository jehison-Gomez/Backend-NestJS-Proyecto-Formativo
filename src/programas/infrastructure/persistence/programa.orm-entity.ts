import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { FichaOrmEntity } from 'src/fichas/infrastructure/persistence/ficha.orm-entity';
import { ProgramaEstado } from 'src/programas/domain/programa-estado.enum';

@Entity('programas')
export class ProgramaOrmEntity {

  @PrimaryGeneratedColumn('uuid')
  id_programa: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('text', { unique: true })
  codigo: string;

  @Column({ type: 'text', nullable: true })
  nivel_formacion: string;

  @Column({ type: 'enum', enum: ProgramaEstado, nullable: true })
  estado: ProgramaEstado;

  @Column('text')
  id_area: string;

  @OneToMany(() => FichaOrmEntity, (ficha) => ficha.programa)
  fichas: FichaOrmEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.nombre = this.nombre.trim().toLowerCase();
    this.codigo = this.codigo.trim().toLowerCase();
  }
}