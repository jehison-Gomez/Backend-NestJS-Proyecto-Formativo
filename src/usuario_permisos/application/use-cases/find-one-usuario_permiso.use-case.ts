import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioPermisoRepository } from '../../domain/usuario_permiso.repository';
import { UsuarioPermiso } from '../../domain/usuario_permiso.entity';

@Injectable()
export class FindOneUsuario_permisoUseCase {
  constructor(private readonly usuarioPermisoRepository: UsuarioPermisoRepository) {}

  async execute(id: string): Promise<UsuarioPermiso> {
    const found = await this.usuarioPermisoRepository.findOne(id);
    if (!found) throw new NotFoundException(`UsuarioPermiso #${id} no encontrado`);
    return found;
  }
}
