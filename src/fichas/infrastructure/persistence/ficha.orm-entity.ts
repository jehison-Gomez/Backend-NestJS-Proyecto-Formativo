import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FichaEstado } from '../../domain/ficha-estado.enum';
import { ProgramaOrmEntity } from 'src/programas/infrastructure/persistence/programa.orm-entity';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';

@Entity('fichas')
export class FichaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'codigo_ficha' })
  codigoFicha: string;

  @Column({ type: 'date', name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column({ type: 'date', name: 'fecha_fin' })
  fechaFin: Date;

  @Column({ type: 'enum', enum: FichaEstado, default: FichaEstado.ACTIVO })
  estado: FichaEstado;

  @ManyToOne(() => ProgramaOrmEntity, (programa) => programa.fichas, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'programa_id' })
  programa: ProgramaOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.fichasLideradas, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'usuario_lider_id' })
  usuarioLider: UsuarioOrmEntity;

  @OneToMany(() => UsuarioOrmEntity, (usuario) => usuario.ficha)
  aprendices: UsuarioOrmEntity[];

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.codigoFicha = this.codigoFicha.trim().toUpperCase();
  }
}
