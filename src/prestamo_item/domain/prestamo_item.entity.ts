import { PrestamoItemEstado } from './prestamo_item-estado.enum';

export class PrestamoItem {
  id: string;
  prestamoId: string;
  materialItemId: string;
  incluidoEnAprobacion: boolean;
  observacion?: string;
  estado: PrestamoItemEstado;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<PrestamoItem>) {
    Object.assign(this, partial);
  }
}
