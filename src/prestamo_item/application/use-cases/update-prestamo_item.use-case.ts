import { Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoItemRepository } from '../../domain/prestamo_item.repository';
import { UpdatePrestamoItemDto } from '../dto/update-prestamo_item.dto';
import { PrestamoItem } from '../../domain/prestamo_item.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdatePrestamoItemUseCase {
  constructor(private readonly prestamoItemRepository: PrestamoItemRepository) {}

  async execute(id: string, dto: UpdatePrestamoItemDto): Promise<PrestamoItem> {
    const exists = await this.prestamoItemRepository.findOne(id);
    if (!exists) throw new NotFoundException(`PrestamoItem #${id} no encontrado`);

    try {
      return await this.prestamoItemRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
