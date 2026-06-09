import { Injectable, NotFoundException } from '@nestjs/common';
import { DevolucionItemRepository } from '../../domain/devolucion_item.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveDevolucionItemUseCase {
  constructor(private readonly repo: DevolucionItemRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.repo.findOne(id);
    if (!exists) throw new NotFoundException(`DevolucionItem #${id} no encontrado`);
    try {
      await this.repo.remove(id);
      return { message: `DevolucionItem #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
