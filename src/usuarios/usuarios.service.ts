import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './application/dto/create-usuario.dto';
import { UpdateUsuarioDto } from './application/dto/update-usuario.dto';
import { CreateUsuarioUseCase } from './application/use-cases/create-usuario.use-case';
import { FindAllUsuariosUseCase } from './application/use-cases/find-all-usuarios.use-case';
import { FindOneUsuarioUseCase } from './application/use-cases/find-one-usuario.use-case';
import { RemoveUsuarioUseCase } from './application/use-cases/remove-usuario.use-case';
import { UpdateUsuarioUseCase } from './application/use-cases/update-usuario.use-case';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly createUseCase: CreateUsuarioUseCase,
    private readonly findAllUseCase: FindAllUsuariosUseCase,
    private readonly findOneUseCase: FindOneUsuarioUseCase,
    private readonly updateUseCase: UpdateUsuarioUseCase,
    private readonly removeUseCase: RemoveUsuarioUseCase,
  ) {}

  create(dto: CreateUsuarioDto)              { return this.createUseCase.execute(dto); }
  findAll()                                   { return this.findAllUseCase.execute(); }
  findOne(id: string)                         { return this.findOneUseCase.execute(id); }
  update(id: string, dto: UpdateUsuarioDto)  { return this.updateUseCase.execute(id, dto); }
  remove(id: string)                          { return this.removeUseCase.execute(id); }
}