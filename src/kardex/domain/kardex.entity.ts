import { KardexEstado } from './kardex-estado.enum';

export class Kardex {
  id: string;
  movimientoId: string;
  fichaId: string;
  usuarioId: string;
  prestamoId?: string | null;
  devolucionId?: string | null;
  materialConsumibleId?: string | null;
  materialItemId?: string | null;
  cantidad: number;
  saldoAnterior?: number | null;
  saldoActual?: number | null;
  estado: KardexEstado;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Kardex>) {
    Object.assign(this, partial);
  }
}
