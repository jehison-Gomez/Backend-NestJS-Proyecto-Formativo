import { Injectable } from '@nestjs/common';
import { NotificacionRepository } from '../../domain/notificacion.repository';
import { Notificacion } from '../../domain/notificacion.entity';

@Injectable()
export class FindByDestinatarioUseCase {
  constructor(private readonly repo: NotificacionRepository) {}

  async execute(destinatarioId: string): Promise<Notificacion[]> {
    return this.repo.findByDestinatario(destinatarioId);
  }
}
