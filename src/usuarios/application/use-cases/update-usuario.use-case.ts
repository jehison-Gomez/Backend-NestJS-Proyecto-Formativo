import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../../domain/usuario.repository';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../../domain/usuario.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { FindOneRoleUseCase } from 'src/roles/application/use-cases/find-one-role.use-case';

@Injectable()
export class UpdateUsuarioUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly findOneFicha: FindOneFichaUseCase,
    private readonly findOneRole: FindOneRoleUseCase,
  ) {}

  async execute(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
    const exists = await this.usuarioRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Usuario #${id} no encontrado`);

    const partial: Partial<Usuario> = {};
    if (dto.nombre          !== undefined) partial.nombre          = dto.nombre;
    if (dto.correo          !== undefined) partial.correo          = dto.correo;
    if (dto.contrasena      !== undefined) partial.contrasena      = dto.contrasena;
    if (dto.telefono        !== undefined) partial.telefono        = dto.telefono;
    if (dto.numeroDocumento !== undefined) partial.numeroDocumento = dto.numeroDocumento;
    if (dto.estado          !== undefined) partial.estado          = dto.estado;
    if (dto.fichaId         !== undefined) partial.ficha           = await this.findOneFicha.execute(dto.fichaId);
    if (dto.rolId           !== undefined) partial.role            = await this.findOneRole.execute(dto.rolId);

    try {
      return await this.usuarioRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
