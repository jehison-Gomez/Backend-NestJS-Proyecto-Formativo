import { Injectable, NotFoundException } from '@nestjs/common';
import { Rol_permisoRepository } from '../../domain/rol_permiso.repository';
import { UpdateRol_permisoDto } from '../dto/update-rol_permiso.dto';
import { Rol_permiso } from '../../domain/rol_permiso.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneRoleUseCase } from 'src/roles/application/use-cases/find-one-role.use-case';
import { FindOnePermisoUseCase } from 'src/permisos/application/use-cases/find-one-permiso.use-case';

@Injectable()
export class UpdateRol_permisoUseCase {
  constructor(
    private readonly rol_permisoRepository: Rol_permisoRepository,
    private readonly findOneRoleUseCase:    FindOneRoleUseCase,
    private readonly findOnePermisoUseCase: FindOnePermisoUseCase,
  ) {}

  async execute(id: string, dto: UpdateRol_permisoDto): Promise<Rol_permiso> {
    const exists = await this.rol_permisoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Rol_permiso #${id} no encontrado`);

    const partial: Partial<Rol_permiso> = {};
    if (dto.rolId)     partial.role    = await this.findOneRoleUseCase.execute(dto.rolId);
    if (dto.permisoId) partial.permiso = await this.findOnePermisoUseCase.execute(dto.permisoId);

    try {
      return await this.rol_permisoRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
