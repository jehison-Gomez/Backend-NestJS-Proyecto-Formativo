import { ConflictException, Injectable } from '@nestjs/common';
import { UsuarioPermisoRepository } from '../../domain/usuario_permiso.repository';
import { CreateUsuario_permisoDto } from '../dto/create-usuario_permiso.dto';
import { UsuarioPermiso } from '../../domain/usuario_permiso.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOnePermisoUseCase } from 'src/permisos/application/use-cases/find-one-permiso.use-case';

@Injectable()
export class CreateUsuario_permisoUseCase {
  constructor(
    private readonly usuarioPermisoRepository: UsuarioPermisoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOnePermiso: FindOnePermisoUseCase,
  ) {}

  async execute(dto: CreateUsuario_permisoDto): Promise<UsuarioPermiso> {
    const usuario = await this.findOneUsuario.execute(dto.usuarioId);
    const permiso = await this.findOnePermiso.execute(dto.permisoId);

    const existentes = await this.usuarioPermisoRepository.findByUsuario(dto.usuarioId);
    const yaAsignado = existentes.some((up) => up.permiso.id === dto.permisoId);
    if (yaAsignado) {
      throw new ConflictException(`El permiso ya está asignado a este usuario`);
    }

    try {
      return await this.usuarioPermisoRepository.create(new UsuarioPermiso({ usuario, permiso }));
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
