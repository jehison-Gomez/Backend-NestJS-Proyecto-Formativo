import { Injectable } from '@nestjs/common';
import { NotificacionRepository } from '../../domain/notificacion.repository';
import { Notificacion } from '../../domain/notificacion.entity';
import { NotificacionTipo } from '../../domain/notificacion-tipo.enum';

export interface CreateNotificacionInput {
  destinatarioId: string;
  tipo: NotificacionTipo;
  titulo: string;
  mensaje: string;
  ruta?: string;
}

@Injectable()
export class CreateNotificacionUseCase {
  constructor(private readonly repo: NotificacionRepository) {}

  async execute(input: CreateNotificacionInput): Promise<Notificacion> {
    const notificacion = new Notificacion({
      destinatarioId: input.destinatarioId,
      tipo:           input.tipo,
      titulo:         input.titulo,
      mensaje:        input.mensaje,
      ruta:           input.ruta ?? '/app/prestamos',
      leido:          false,
    });
    return this.repo.create(notificacion);
  }
}
