import { Injectable } from '@nestjs/common';
import { UsuarioPermisoRepository } from '../../domain/usuario_permiso.repository';
import { UsuarioPermiso } from '../../domain/usuario_permiso.entity';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class FindByUsuarioUsuario_permisoUseCase {
  constructor(
    private readonly usuarioPermisoRepository: UsuarioPermisoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(usuarioId: string): Promise<UsuarioPermiso[]> {
    await this.findOneUsuario.execute(usuarioId);
    return this.usuarioPermisoRepository.findByUsuario(usuarioId);
  }
}
