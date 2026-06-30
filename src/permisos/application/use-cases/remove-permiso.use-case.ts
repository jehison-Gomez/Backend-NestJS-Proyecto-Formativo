import { Injectable, NotFoundException } from '@nestjs/common';
import { PermisoRepository } from '../../domain/permiso.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemovePermisoUseCase {
  constructor(private readonly permisoRepository: PermisoRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.permisoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Permiso #${id} no encontrado`);

    try {
      await this.permisoRepository.remove(id);
      return { message: `Permiso #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
