import { Injectable, NotFoundException } from '@nestjs/common';
import { Rol_permisoRepository } from '../../domain/rol_permiso.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveRol_permisoUseCase {
  constructor(private readonly rol_permisoRepository: Rol_permisoRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.rol_permisoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Rol_permiso #${id} no encontrado`);

    try {
      await this.rol_permisoRepository.remove(id);
      return { message: `Rol_permiso #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
