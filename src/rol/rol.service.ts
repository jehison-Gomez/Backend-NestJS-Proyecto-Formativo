import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './application/dto/create-rol.dto';
import { UpdateRolDto } from './application/dto/update-rol.dto';
import { CreateRolUseCase } from './application/use-cases/create-rol.use-case';
import { FindAllRolsUseCase } from './application/use-cases/find-all-rols.use-case';
import { FindOneRolUseCase } from './application/use-cases/find-one-rol.use-case';
import { RemoveRolUseCase } from './application/use-cases/remove-rol.use-case';
import { UpdateRolUseCase } from './application/use-cases/update-rol.use-case';

@Injectable()
export class RolService {
  constructor(
    private readonly createUseCase: CreateRolUseCase,
    private readonly findAllUseCase: FindAllRolsUseCase,
    private readonly findOneUseCase: FindOneRolUseCase,
    private readonly updateUseCase: UpdateRolUseCase,
    private readonly removeUseCase: RemoveRolUseCase,
  ) {}

  create(dto: CreateRolDto)              { return this.createUseCase.execute(dto); }
  findAll()                                   { return this.findAllUseCase.execute(); }
  findOne(id: string)                         { return this.findOneUseCase.execute(id); }
  update(id: string, dto: UpdateRolDto)  { return this.updateUseCase.execute(id, dto); }
  remove(id: string)                          { return this.removeUseCase.execute(id); }
}