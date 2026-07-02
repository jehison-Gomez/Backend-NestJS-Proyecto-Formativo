import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/usuario.repository';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Usuario } from '../../domain/usuario.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { FindOneRoleUseCase } from 'src/roles/application/use-cases/find-one-role.use-case';
import type { Sede } from 'src/sedes/domain/sede.entity';

@Injectable()
export class CreateUsuarioUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly findOneFicha: FindOneFichaUseCase,
    private readonly findOneRole: FindOneRoleUseCase,
  ) {}

  async execute(dto: CreateUsuarioDto): Promise<Usuario> {
    const ficha = dto.fichaId ? await this.findOneFicha.execute(dto.fichaId) : undefined;
    const role  = await this.findOneRole.execute(dto.rolId);
    const sede  = dto.sedeId ? ({ id: dto.sedeId } as Sede) : null;

    try {
      const usuario = new Usuario({
        nombre:          dto.nombre,
        correo:          dto.correo,
        contrasena:      dto.contrasena,
        telefono:        dto.telefono,
        numeroDocumento: dto.numeroDocumento,
        estado:          dto.estado,
        role,
        sede,
        ...(ficha && { ficha }),
      });
      return await this.usuarioRepository.create(usuario);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
