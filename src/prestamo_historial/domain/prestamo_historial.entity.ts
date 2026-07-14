export class PrestamoHistorial {
  id: string;
  prestamoId: string;
  estadoAnterior: string | null;
  estadoNuevo: string;
  usuarioId: string | null;
  observacion: string | null;
  creadoEn: Date;

  constructor(partial: Partial<PrestamoHistorial>) {
    Object.assign(this, partial);
  }
}
