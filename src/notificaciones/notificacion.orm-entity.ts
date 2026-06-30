import {
  Column, CreateDateColumn, Entity,
  JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';

@Entity('notificaciones')
export class NotificacionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  mensaje: string;

  // tipo: 'prestamo_nuevo' | 'prestamo_aprobado' | 'prestamo_rechazado' | 'stock_bajo'
  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'boolean', default: false })
  leida: boolean;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'destinatario_id' })
  destinatario: UsuarioOrmEntity;

  @Column({ type: 'uuid', nullable: true, name: 'prestamo_id' })
  prestamoId: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ruta: string | null;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;
}
