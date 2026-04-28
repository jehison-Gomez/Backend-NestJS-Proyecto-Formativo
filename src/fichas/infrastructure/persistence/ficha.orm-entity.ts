import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ProgramaOrmEntity } from 'src/programas/infrastructure/persistence/programa.orm-entity';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { FichaEstado } from 'src/fichas/domain/ficha-estado.enum';

@Entity('fichas')
export class FichaOrmEntity {

  @PrimaryGeneratedColumn('uuid')
  id_ficha: string;

  @Column('text', { unique: true })
  codigo_ficha: string;

  @Column('date')
  fecha_inicio: Date;

  @Column('date')
  fecha_fin: Date;

  @Column({ type: 'enum', enum: FichaEstado })
  estado: FichaEstado;

  @ManyToOne(() => ProgramaOrmEntity, (programa) => programa.fichas, { nullable: false })
  @JoinColumn({ name: 'id_programa' })
  programa: ProgramaOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.fichas_lider, { nullable: true })
  @JoinColumn({ name: 'id_usuario_lider' })
  usuario_lider: UsuarioOrmEntity;

  @OneToMany(() => UsuarioOrmEntity, (usuario) => usuario.ficha)
  usuarios: UsuarioOrmEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.codigo_ficha = this.codigo_ficha.trim().toLowerCase();
  }
}