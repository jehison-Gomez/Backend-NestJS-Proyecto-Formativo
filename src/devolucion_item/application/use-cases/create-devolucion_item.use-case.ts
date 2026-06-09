import { Injectable } from '@nestjs/common';
import { DevolucionItemRepository } from '../../domain/devolucion_item.repository';
import { CreateDevolucionItemDto } from '../dto/create-devolucion_item.dto';
import { DevolucionItem } from '../../domain/devolucion_item.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreateDevolucionItemUseCase {
  constructor(private readonly repo: DevolucionItemRepository) {}

  async execute(dto: CreateDevolucionItemDto): Promise<DevolucionItem> {
    try {
      const di = new DevolucionItem({
        devolucionId:      dto.devolucionId,
        prestamoItemId:    dto.prestamoItemId,
        condicionDevuelta: dto.condicionDevuelta,
        observacion:       dto.observacion,
        conNovedad:        dto.conNovedad ?? false,
      });
      return await this.repo.create(di);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
