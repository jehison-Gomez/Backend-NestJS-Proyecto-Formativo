import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TipoMovimiento } from '../../domain/entities/movimiento.entity';

@Entity('Movimiento')
export class MovimientoOrmEntity {
  @PrimaryGeneratedColumn({ name: 'ID_Movimiento' })
  id!: number;

  @Column({ name: 'Fecha', type: 'date' })
  fecha!: Date;

  @Column({ name: 'Tipo', type: 'enum', enum: TipoMovimiento })
  tipo!: TipoMovimiento;

  @Column({ name: 'Cantidad', type: 'int' })
  cantidad!: number;

  @Column({ name: 'Motivo', type: 'varchar', length: 255 })
  motivo!: string;

  @Column({ name: 'FK_ID_Movimiento', type: 'int', nullable: true })
  movimientoId!: number;
}
