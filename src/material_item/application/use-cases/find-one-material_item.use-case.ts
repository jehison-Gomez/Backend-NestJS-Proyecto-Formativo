import { Injectable, NotFoundException } from '@nestjs/common';
import { Material_itemRepository } from '../../domain/material_item.repository';
import { Material_item } from '../../domain/material_item.entity';

@Injectable()
export class FindOneMaterial_itemUseCase {
  constructor(private readonly material_itemRepository: Material_itemRepository) {}

  async execute(id: string): Promise<Material_item> {
    const material_item = await this.material_itemRepository.findOne(id);
    if (!material_item) throw new NotFoundException(`Material_item #${id} no encontrado`);
    return material_item;
  }
}
