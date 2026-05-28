import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AprobacioneDecision } from '../../domain/aprobacione-decision.enum';
import { AprobacioneEstado } from '../../domain/aprobacione-estado.enum';
import { PrestamoOrmEntity } from 'src/prestamos/infrastructure/persistence/prestamo.orm-entity';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';

@Entity('aprobaciones')
export class AprobacioneOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: AprobacioneDecision, default: AprobacioneDecision.PENDIENTE })
  decision: AprobacioneDecision;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @Column({ type: 'enum', enum: AprobacioneEstado, default: AprobacioneEstado.ACTIVO })
  estado: AprobacioneEstado;

  @OneToOne(() => PrestamoOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'prestamo_id' })
  prestamo: PrestamoOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
