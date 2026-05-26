import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria_materialRepository } from '../../domain/categoria_material.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveCategoria_materialUseCase {
  constructor(private readonly categoria_materialRepository: Categoria_materialRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.categoria_materialRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Categoria_material #${id} no encontrado`);

    try {
      await this.categoria_materialRepository.remove(id);
      return { message: `Categoria_material #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
