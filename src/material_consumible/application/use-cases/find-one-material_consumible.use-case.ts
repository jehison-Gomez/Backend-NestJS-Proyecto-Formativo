import { Injectable, NotFoundException } from '@nestjs/common';
import { Material_consumibleRepository } from '../../domain/material_consumible.repository';
import { Material_consumible } from '../../domain/material_consumible.entity';

@Injectable()
export class FindOneMaterial_consumibleUseCase {
  constructor(private readonly material_consumibleRepository: Material_consumibleRepository) {}

  async execute(id: string): Promise<Material_consumible> {
    const material_consumible = await this.material_consumibleRepository.findOne(id);
    if (!material_consumible) throw new NotFoundException(`Material_consumible #${id} no encontrado`);
    return material_consumible;
  }
}
