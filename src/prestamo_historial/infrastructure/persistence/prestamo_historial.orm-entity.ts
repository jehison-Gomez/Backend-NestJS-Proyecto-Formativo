import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prestamo_historial')
export class PrestamoHistorialOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'prestamo_id' })
  prestamoId: string;

  @Column({ type: 'varchar', nullable: true, name: 'estado_anterior' })
  estadoAnterior: string | null;

  @Column({ type: 'varchar', name: 'estado_nuevo' })
  estadoNuevo: string;

  @Column({ type: 'uuid', nullable: true, name: 'usuario_id' })
  usuarioId: string | null;

  @Column({ type: 'text', nullable: true })
  observacion: string | null;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;
}
