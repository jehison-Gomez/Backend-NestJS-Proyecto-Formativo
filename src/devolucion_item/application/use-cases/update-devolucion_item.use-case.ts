import { Injectable, NotFoundException } from '@nestjs/common';
import { DevolucionItemRepository } from '../../domain/devolucion_item.repository';
import { UpdateDevolucionItemDto } from '../dto/update-devolucion_item.dto';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateDevolucionItemUseCase {
  constructor(private readonly repo: DevolucionItemRepository) {}

  async execute(id: string, dto: UpdateDevolucionItemDto) {
    const exists = await this.repo.findOne(id);
    if (!exists) throw new NotFoundException(`DevolucionItem #${id} no encontrado`);
    try {
      return await this.repo.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
