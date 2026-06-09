import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DevolucioneEstado } from '../../domain/devolucione-estado.enum';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { PrestamoOrmEntity } from 'src/prestamos/infrastructure/persistence/prestamo.orm-entity';

@Entity('devoluciones')
export class DevolucioneOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', name: 'fecha_devolucion' })
  fechaDevolucion: Date;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @Column({ type: 'enum', enum: DevolucioneEstado, default: DevolucioneEstado.COMPLETA })
  estado: DevolucioneEstado;

  @ManyToOne(() => PrestamoOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'prestamo_id' })
  prestamo: PrestamoOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'recibido_por_id' })
  recibidoPor: UsuarioOrmEntity;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
