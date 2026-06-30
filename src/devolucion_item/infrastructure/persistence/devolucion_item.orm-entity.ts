import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DevolucionItemCondicion } from '../../domain/devolucion_item-condicion.enum';
import { DevolucioneOrmEntity } from 'src/devoluciones/infrastructure/persistence/devolucione.orm-entity';
import { PrestamoItemOrmEntity } from 'src/prestamo_item/infrastructure/persistence/prestamo_item.orm-entity';

@Entity('devolucion_item')
export class DevolucionItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DevolucioneOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'devolucion_id' })
  devolucion: DevolucioneOrmEntity;

  @ManyToOne(() => PrestamoItemOrmEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'prestamo_item_id' })
  prestamoItem: PrestamoItemOrmEntity;

  @Column({ type: 'enum', enum: DevolucionItemCondicion, name: 'condicion_devuelta' })
  condicionDevuelta: DevolucionItemCondicion;

  @Column({ type: 'text', nullable: true })
  observacion: string | null;

  @Column({ type: 'boolean', default: false, name: 'con_novedad' })
  conNovedad: boolean;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
