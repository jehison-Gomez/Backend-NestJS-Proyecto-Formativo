import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRepository } from '../../domain/usuario.repository';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Usuario } from '../../domain/usuario.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { FindOneRoleUseCase } from 'src/roles/application/use-cases/find-one-role.use-case';
import { FindOneSedeUseCase } from 'src/sedes/application/use-cases/find-one-sede.use-case';
import { Usuario_permisoOrmEntity } from 'src/usuario_permisos/infrastructure/persistence/usuario_permiso.orm-entity';

@Injectable()
export class CreateUsuarioUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly findOneFicha: FindOneFichaUseCase,
    private readonly findOneRole: FindOneRoleUseCase,
    private readonly findOneSede: FindOneSedeUseCase,
    @InjectRepository(Usuario_permisoOrmEntity)
    private readonly usuarioPermisoRepo: Repository<Usuario_permisoOrmEntity>,
  ) {}

  async execute(dto: CreateUsuarioDto): Promise<Usuario> {
    const ficha = dto.fichaId ? await this.findOneFicha.execute(dto.fichaId) : undefined;
    const role  = await this.findOneRole.execute(dto.rolId);
    const sede  = dto.sedeId ? await this.findOneSede.execute(dto.sedeId) : undefined;

    try {
      const usuario = new Usuario({
        nombre:          dto.nombre,
        correo:          dto.correo.trim().toLowerCase(),
        contrasena:      dto.contrasena,
        telefono:        dto.telefono,
        numeroDocumento: dto.numeroDocumento,
        tipoDocumento:   dto.tipoDocumento ?? null,
        estado:          dto.estado,
        role,
        ...(ficha && { ficha }),
        ...(sede  && { sede  }),
      });
      const saved = await this.usuarioRepository.create(usuario);

      if (dto.permisosAdicionalesIds?.length) {
        const entities = dto.permisosAdicionalesIds.map((permisoId) =>
          this.usuarioPermisoRepo.create({
            usuario: { id: saved.id } as any,
            permiso: { id: permisoId } as any,
          }),
        );
        await this.usuarioPermisoRepo.save(entities);
      }

      return saved;
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
