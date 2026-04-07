import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TipoMovimiento {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA',
}

@Entity('Movimiento')
export class Movimiento {
  @PrimaryGeneratedColumn({ name: 'ID_Movimiento' })
  id: number;

  @Column({ name: 'Fecha', type: 'date' })
  fecha: Date;

  @Column({ name: 'Tipo', type: 'enum', enum: TipoMovimiento })
  tipo: TipoMovimiento;

  @Column({ name: 'Cantidad', type: 'int' })
  cantidad: number;

  @Column({ name: 'Motivo', type: 'varchar', length: 255 })
  motivo: string;

  @Column({ name: 'FK_ID_Movimiento', type: 'int', nullable: true })
  movimientoId: number;
}
