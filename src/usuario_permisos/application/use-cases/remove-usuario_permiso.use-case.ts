import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioPermisoRepository } from '../../domain/usuario_permiso.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveUsuario_permisoUseCase {
  constructor(private readonly usuarioPermisoRepository: UsuarioPermisoRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.usuarioPermisoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`UsuarioPermiso #${id} no encontrado`);

    try {
      await this.usuarioPermisoRepository.remove(id);
      return { message: `Permiso retirado del usuario correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
