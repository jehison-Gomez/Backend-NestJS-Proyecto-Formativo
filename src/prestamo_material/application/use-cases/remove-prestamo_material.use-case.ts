import { Injectable, NotFoundException } from '@nestjs/common';
import { Prestamo_materialRepository } from '../../domain/prestamo_material.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemovePrestamo_materialUseCase {
  constructor(private readonly prestamo_materialRepository: Prestamo_materialRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.prestamo_materialRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Prestamo_material #${id} no encontrado`);

    try {
      await this.prestamo_materialRepository.remove(id);
      return { message: `Prestamo_material #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
