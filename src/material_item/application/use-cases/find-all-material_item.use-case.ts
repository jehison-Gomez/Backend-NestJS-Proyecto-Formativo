import { Injectable } from '@nestjs/common';
import { Material_itemRepository } from '../../domain/material_item.repository';
import { Material_item } from '../../domain/material_item.entity';

@Injectable()
export class FindAllMaterial_itemUseCase {
  constructor(private readonly material_itemRepository: Material_itemRepository) {}

  async execute(): Promise<Material_item[]> {
    return this.material_itemRepository.findAll();
  }
}
