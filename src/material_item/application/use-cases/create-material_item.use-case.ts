import { Injectable } from '@nestjs/common';
import { Material_itemRepository } from '../../domain/material_item.repository';
import { CreateMaterial_itemDto } from '../dto/create-material_item.dto';
import { Material_item } from '../../domain/material_item.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreateMaterial_itemUseCase {
  constructor(private readonly material_itemRepository: Material_itemRepository) {}

  async execute(dto: CreateMaterial_itemDto): Promise<Material_item> {
    try {
      const material_item = new Material_item({ ...dto });
      return await this.material_itemRepository.create(material_item);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
