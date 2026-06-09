import { PrestamoConsumibleEstado } from './prestamo_consumible-estado.enum';

export class PrestamoConsumible {
  id: string;
  prestamoId: string;
  materialConsumibleId: string;
  cantidadSolicitada: number;
  cantidadAprobada?: number | null;
  observacion?: string;
  estado: PrestamoConsumibleEstado;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<PrestamoConsumible>) {
    Object.assign(this, partial);
  }
}
