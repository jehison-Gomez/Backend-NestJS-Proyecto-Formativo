import { Injectable } from '@nestjs/common';
import { Rol_permisoRepository } from '../../domain/rol_permiso.repository';
import { CreateRol_permisoDto } from '../dto/create-rol_permiso.dto';
import { Rol_permiso } from '../../domain/rol_permiso.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneRoleUseCase } from 'src/roles/application/use-cases/find-one-role.use-case';
import { FindOnePermisoUseCase } from 'src/permisos/application/use-cases/find-one-permiso.use-case';

@Injectable()
export class CreateRol_permisoUseCase {
  constructor(
    private readonly rol_permisoRepository: Rol_permisoRepository,
    private readonly findOneRoleUseCase:    FindOneRoleUseCase,
    private readonly findOnePermisoUseCase: FindOnePermisoUseCase,
  ) {}

  async execute(dto: CreateRol_permisoDto): Promise<Rol_permiso> {
    const role    = await this.findOneRoleUseCase.execute(dto.rolId);
    const permiso = await this.findOnePermisoUseCase.execute(dto.permisoId);

    try {
      const rp = new Rol_permiso({ role, permiso });
      return await this.rol_permisoRepository.create(rp);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
