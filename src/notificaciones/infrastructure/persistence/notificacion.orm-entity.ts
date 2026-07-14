import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NotificacionTipo } from '../../domain/notificacion-tipo.enum';

@Entity('notificaciones')
export class NotificacionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'destinatario_id' })
  destinatarioId: string;

  @Column({ type: 'enum', enum: NotificacionTipo })
  tipo: NotificacionTipo;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  mensaje: string;

  @Column({ type: 'varchar', length: 255, default: '/app/prestamos' })
  ruta: string;

  @Column({ type: 'boolean', default: false })
  leido: boolean;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;
}
