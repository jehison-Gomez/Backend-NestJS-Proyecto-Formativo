import { Injectable } from '@nestjs/common';
import { CreateRolPermisoDto } from './application/dto/create-rol_permiso.dto';
import { UpdateRolPermisoDto } from './application/dto/update-rol_permiso.dto';
import { CreateRolPermisoUseCase } from './application/use-cases/create-rol_permiso.use-case';
import { FindAllRolPermisosUseCase } from './application/use-cases/find-all-rol_permisos.use-case';
import { FindOneRolPermisoUseCase } from './application/use-cases/find-one-rol_permiso.use-case';
import { RemoveRolPermisoUseCase } from './application/use-cases/remove-rol_permiso.use-case';
import { UpdateRolPermisoUseCase } from './application/use-cases/update-rol_permiso.use-case';

@Injectable()
export class RolPermisosService {
  constructor(
    private readonly createUseCase: CreateRolPermisoUseCase,
    private readonly findAllUseCase: FindAllRolPermisosUseCase,
    private readonly findOneUseCase: FindOneRolPermisoUseCase,
    private readonly updateUseCase: UpdateRolPermisoUseCase,
    private readonly removeUseCase: RemoveRolPermisoUseCase,
  ) {}

  create(dto: CreateRolPermisoDto)              { return this.createUseCase.execute(dto); }
  findAll()                                   { return this.findAllUseCase.execute(); }
  findOne(id: string)                         { return this.findOneUseCase.execute(id); }
  update(id: string, dto: UpdateRolPermisoDto)  { return this.updateUseCase.execute(id, dto); }
  remove(id: string)                          { return this.removeUseCase.execute(id); }
}