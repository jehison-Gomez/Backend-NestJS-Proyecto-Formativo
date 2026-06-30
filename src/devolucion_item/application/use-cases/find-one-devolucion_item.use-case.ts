import { Injectable, NotFoundException } from '@nestjs/common';
import { DevolucionItemRepository } from '../../domain/devolucion_item.repository';

@Injectable()
export class FindOneDevolucionItemUseCase {
  constructor(private readonly repo: DevolucionItemRepository) {}

  async execute(id: string) {
    const found = await this.repo.findOne(id);
    if (!found) throw new NotFoundException(`DevolucionItem #${id} no encontrado`);
    return found;
  }
}
