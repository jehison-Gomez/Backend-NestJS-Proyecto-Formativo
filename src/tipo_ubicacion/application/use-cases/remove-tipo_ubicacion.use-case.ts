import { Injectable, NotFoundException } from '@nestjs/common';
import { Tipo_ubicacionRepository } from '../../domain/tipo_ubicacion.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveTipo_ubicacionUseCase {
  constructor(private readonly tipo_ubicacionRepository: Tipo_ubicacionRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.tipo_ubicacionRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Tipo_ubicacion #${id} no encontrado`);

    try {
      await this.tipo_ubicacionRepository.remove(id);
      return { message: `Tipo_ubicacion #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
