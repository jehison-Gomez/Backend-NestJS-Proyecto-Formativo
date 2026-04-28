import { Injectable } from '@nestjs/common';
import { CreatePermisoDto } from './application/dto/create-permiso.dto';
import { UpdatePermisoDto } from './application/dto/update-permiso.dto';
import { CreatePermisoUseCase } from './application/use-cases/create-permiso.use-case';
import { FindAllPermisosUseCase } from './application/use-cases/find-all-permisos.use-case';
import { FindOnePermisoUseCase } from './application/use-cases/find-one-permiso.use-case';
import { RemovePermisoUseCase } from './application/use-cases/remove-permiso.use-case';
import { UpdatePermisoUseCase } from './application/use-cases/update-permiso.use-case';

@Injectable()
export class PermisosService {
  constructor(
    private readonly createUseCase: CreatePermisoUseCase,
    private readonly findAllUseCase: FindAllPermisosUseCase,
    private readonly findOneUseCase: FindOnePermisoUseCase,
    private readonly updateUseCase: UpdatePermisoUseCase,
    private readonly removeUseCase: RemovePermisoUseCase,
  ) {}

  create(dto: CreatePermisoDto)              { return this.createUseCase.execute(dto); }
  findAll()                                   { return this.findAllUseCase.execute(); }
  findOne(id: string)                         { return this.findOneUseCase.execute(id); }
  update(id: string, dto: UpdatePermisoDto)  { return this.updateUseCase.execute(id, dto); }
  remove(id: string)                          { return this.removeUseCase.execute(id); }
}