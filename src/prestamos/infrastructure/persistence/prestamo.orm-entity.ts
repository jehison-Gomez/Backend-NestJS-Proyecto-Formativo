import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { FichaOrmEntity } from 'src/fichas/infrastructure/persistence/ficha.orm-entity';

@Entity('prestamos')
export class PrestamoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  motivo: string;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE', name: 'fecha_registro' })
  fechaRegistro: Date;

  @Column({ type: 'date', name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column({ type: 'date', name: 'fecha_fin' })
  fechaFin: Date;

  @Column({ type: 'date', nullable: true, name: 'fecha_devolucion_esperada' })
  fechaDevolucionEsperada: Date | null;

  @Column({ type: 'enum', enum: PrestamoEstado, default: PrestamoEstado.PENDIENTE })
  estado: PrestamoEstado;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'solicitante_id' })
  solicitante: UsuarioOrmEntity;

  @ManyToOne(() => FichaOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ficha_id' })
  ficha: FichaOrmEntity;

  @ManyToMany(() => UsuarioOrmEntity)
  @JoinTable({
    name: 'prestamo_beneficiario',
    joinColumn: { name: 'prestamo_id' },
    inverseJoinColumn: { name: 'usuario_id' },
  })
  beneficiarios: UsuarioOrmEntity[];

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'revisado_por_id' })
  revisadoPor: UsuarioOrmEntity | null;

  @Column({ type: 'timestamp', nullable: true, name: 'fecha_revision' })
  fechaRevision: Date | null;

  @Column({ type: 'text', nullable: true, name: 'observacion_revision' })
  observacionRevision: string | null;

  @Column({ type: 'timestamp', nullable: true, name: 'fecha_entrega' })
  fechaEntrega: Date | null;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
