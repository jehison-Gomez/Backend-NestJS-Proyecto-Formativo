import { Injectable, NotFoundException } from '@nestjs/common';
import { Material_ubicacionRepository } from '../../domain/material_ubicacion.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveMaterial_ubicacionUseCase {
  constructor(private readonly material_ubicacionRepository: Material_ubicacionRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.material_ubicacionRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Material_ubicacion #${id} no encontrado`);

    try {
      await this.material_ubicacionRepository.remove(id);
      return { message: `Material_ubicacion #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
