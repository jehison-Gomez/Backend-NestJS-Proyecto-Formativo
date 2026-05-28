import { Injectable, NotFoundException } from '@nestjs/common';
import { Material_itemRepository } from '../../domain/material_item.repository';
import { UpdateMaterial_itemDto } from '../dto/update-material_item.dto';
import { Material_item } from '../../domain/material_item.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateMaterial_itemUseCase {
  constructor(private readonly material_itemRepository: Material_itemRepository) {}

  async execute(id: string, dto: UpdateMaterial_itemDto): Promise<Material_item> {
    const exists = await this.material_itemRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Material_item #${id} no encontrado`);

    try {
      return await this.material_itemRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
