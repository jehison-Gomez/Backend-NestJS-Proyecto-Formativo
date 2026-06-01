import { Injectable } from '@nestjs/common';
import { UsuarioPermisoRepository } from '../../domain/usuario_permiso.repository';
import { UsuarioPermiso } from '../../domain/usuario_permiso.entity';

@Injectable()
export class FindAllUsuario_permisosUseCase {
  constructor(private readonly usuarioPermisoRepository: UsuarioPermisoRepository) {}

  async execute(): Promise<UsuarioPermiso[]> {
    return this.usuarioPermisoRepository.findAll();
  }
}
