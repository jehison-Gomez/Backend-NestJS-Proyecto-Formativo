import { Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoItemRepository } from '../../domain/prestamo_item.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemovePrestamoItemUseCase {
  constructor(private readonly prestamoItemRepository: PrestamoItemRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.prestamoItemRepository.findOne(id);
    if (!exists) throw new NotFoundException(`PrestamoItem #${id} no encontrado`);

    try {
      await this.prestamoItemRepository.remove(id);
      return { message: `PrestamoItem #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
