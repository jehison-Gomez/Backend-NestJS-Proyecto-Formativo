import { NotificacionTipo } from './notificacion-tipo.enum';

export class Notificacion {
  id: string;
  destinatarioId: string;
  tipo: NotificacionTipo;
  titulo: string;
  mensaje: string;
  ruta: string;
  leido: boolean;
  creadoEn: Date;

  constructor(partial: Partial<Notificacion>) {
    Object.assign(this, partial);
  }
}
