export enum TipoMovimiento {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA',
}

export class Movimiento {
  id!: number;
  fecha!: Date;
  tipo!: TipoMovimiento;
  cantidad!: number;
  motivo!: string;
  movimientoId!: number;
}
