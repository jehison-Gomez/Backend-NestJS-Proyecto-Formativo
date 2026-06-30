import { Injectable, NotFoundException } from '@nestjs/common';
import { Material_itemRepository } from '../../domain/material_item.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveMaterial_itemUseCase {
  constructor(private readonly material_itemRepository: Material_itemRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.material_itemRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Material_item #${id} no encontrado`);

    try {
      await this.material_itemRepository.remove(id);
      return { message: `Material_item #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
