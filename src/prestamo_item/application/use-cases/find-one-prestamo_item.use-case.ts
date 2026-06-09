import { Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoItemRepository } from '../../domain/prestamo_item.repository';
import { PrestamoItem } from '../../domain/prestamo_item.entity';

@Injectable()
export class FindOnePrestamoItemUseCase {
  constructor(private readonly prestamoItemRepository: PrestamoItemRepository) {}

  async execute(id: string): Promise<PrestamoItem> {
    const item = await this.prestamoItemRepository.findOne(id);
    if (!item) throw new NotFoundException(`PrestamoItem #${id} no encontrado`);
    return item;
  }
}
