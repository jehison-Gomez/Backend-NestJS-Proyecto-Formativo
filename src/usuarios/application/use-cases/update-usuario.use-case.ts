import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRepository } from '../../domain/usuario.repository';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../../domain/usuario.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { FindOneRoleUseCase } from 'src/roles/application/use-cases/find-one-role.use-case';
import { FindOneSedeUseCase } from 'src/sedes/application/use-cases/find-one-sede.use-case';
import { Usuario_permisoOrmEntity } from 'src/usuario_permisos/infrastructure/persistence/usuario_permiso.orm-entity';

@Injectable()
export class UpdateUsuarioUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly findOneFicha: FindOneFichaUseCase,
    private readonly findOneRole: FindOneRoleUseCase,
    private readonly findOneSede: FindOneSedeUseCase,
    @InjectRepository(Usuario_permisoOrmEntity)
    private readonly usuarioPermisoRepo: Repository<Usuario_permisoOrmEntity>,
  ) {}

  async execute(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
    const exists = await this.usuarioRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Usuario #${id} no encontrado`);

    const partial: Partial<Usuario> = {};
    if (dto.nombre          !== undefined) partial.nombre          = dto.nombre;
    if (dto.correo          !== undefined) partial.correo          = dto.correo.trim().toLowerCase();
    if (dto.contrasena      !== undefined) partial.contrasena      = dto.contrasena;
    if (dto.telefono        !== undefined) partial.telefono        = dto.telefono;
    if (dto.numeroDocumento !== undefined) partial.numeroDocumento = dto.numeroDocumento;
    if (dto.tipoDocumento   !== undefined) partial.tipoDocumento   = dto.tipoDocumento;
    if (dto.estado          !== undefined) partial.estado          = dto.estado;
    if (dto.fichaId         !== undefined) partial.ficha           = await this.findOneFicha.execute(dto.fichaId);
    if (dto.rolId           !== undefined) partial.role            = await this.findOneRole.execute(dto.rolId);
    if (dto.sedeId          !== undefined) partial.sede            = dto.sedeId ? await this.findOneSede.execute(dto.sedeId) : null;

    try {
      const updated = await this.usuarioRepository.update(id, partial);

      if (dto.permisosAdicionalesIds !== undefined) {
        await this.usuarioPermisoRepo.delete({ usuario: { id } as any });
        if (dto.permisosAdicionalesIds.length > 0) {
          const entities = dto.permisosAdicionalesIds.map((permisoId) =>
            this.usuarioPermisoRepo.create({
              usuario: { id } as any,
              permiso: { id: permisoId } as any,
            }),
          );
          await this.usuarioPermisoRepo.save(entities);
        }
      }

      return updated;
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
