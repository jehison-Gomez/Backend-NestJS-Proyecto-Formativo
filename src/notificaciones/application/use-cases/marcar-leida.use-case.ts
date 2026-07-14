import { Injectable } from '@nestjs/common';
import { NotificacionRepository } from '../../domain/notificacion.repository';

@Injectable()
export class MarcarLeidaUseCase {
  constructor(private readonly repo: NotificacionRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.marcarLeida(id);
  }
}
