import { DevolucionItemCondicion } from './devolucion_item-condicion.enum';

export class DevolucionItem {
  id: string;
  devolucionId: string;
  prestamoItemId: string;
  condicionDevuelta: DevolucionItemCondicion;
  observacion?: string;
  conNovedad: boolean;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<DevolucionItem>) {
    Object.assign(this, partial);
  }
}
