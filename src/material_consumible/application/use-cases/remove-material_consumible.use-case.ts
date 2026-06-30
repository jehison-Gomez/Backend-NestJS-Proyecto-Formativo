import { Injectable, NotFoundException } from '@nestjs/common';
import { Material_consumibleRepository } from '../../domain/material_consumible.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveMaterial_consumibleUseCase {
  constructor(private readonly material_consumibleRepository: Material_consumibleRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.material_consumibleRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Material_consumible #${id} no encontrado`);

    try {
      await this.material_consumibleRepository.remove(id);
      return { message: `Material_consumible #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
