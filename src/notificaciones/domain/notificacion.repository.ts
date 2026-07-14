import { Notificacion } from './notificacion.entity';

export abstract class NotificacionRepository {
  abstract create(notificacion: Notificacion): Promise<Notificacion>;
  abstract findByDestinatario(destinatarioId: string): Promise<Notificacion[]>;
  abstract marcarLeida(id: string): Promise<void>;
  abstract marcarTodasLeidas(destinatarioId: string): Promise<void>;
}
