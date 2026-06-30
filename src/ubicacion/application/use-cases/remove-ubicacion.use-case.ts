import { Injectable, NotFoundException } from '@nestjs/common';
import { UbicacionRepository } from '../../domain/ubicacion.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveUbicacionUseCase {
  constructor(private readonly ubicacionRepository: UbicacionRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.ubicacionRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Ubicacion #${id} no encontrado`);

    try {
      await this.ubicacionRepository.remove(id);
      return { message: `Ubicacion #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
