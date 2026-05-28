import { Injectable } from '@nestjs/common';
import { Material_consumibleRepository } from '../../domain/material_consumible.repository';
import { Material_consumible } from '../../domain/material_consumible.entity';

@Injectable()
export class FindAllMaterial_consumibleUseCase {
  constructor(private readonly material_consumibleRepository: Material_consumibleRepository) {}

  async execute(): Promise<Material_consumible[]> {
    return this.material_consumibleRepository.findAll();
  }
}
