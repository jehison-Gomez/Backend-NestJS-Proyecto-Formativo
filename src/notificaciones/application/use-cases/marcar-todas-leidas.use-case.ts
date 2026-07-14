import { Injectable } from '@nestjs/common';
import { NotificacionRepository } from '../../domain/notificacion.repository';

@Injectable()
export class MarcarTodasLeidasUseCase {
  constructor(private readonly repo: NotificacionRepository) {}

  async execute(destinatarioId: string): Promise<void> {
    return this.repo.marcarTodasLeidas(destinatarioId);
  }
}
