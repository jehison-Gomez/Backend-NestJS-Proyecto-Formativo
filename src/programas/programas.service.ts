import { Injectable } from '@nestjs/common';
import { CreateProgramaDto } from './application/dto/create-programa.dto';
import { UpdateProgramaDto } from './application/dto/update-programa.dto';
import { CreateProgramaUseCase } from './application/use-cases/create-programa.use-case';
import { FindAllProgramasUseCase } from './application/use-cases/find-all-programas.use-case';
import { FindOneProgramaUseCase } from './application/use-cases/find-one-programa.use-case';
import { RemoveProgramaUseCase } from './application/use-cases/remove-programa.use-case';
import { UpdateProgramaUseCase } from './application/use-cases/update-programa.use-case';

@Injectable()
export class ProgramasService {
  constructor(
    private readonly createUseCase: CreateProgramaUseCase,
    private readonly findAllUseCase: FindAllProgramasUseCase,
    private readonly findOneUseCase: FindOneProgramaUseCase,
    private readonly updateUseCase: UpdateProgramaUseCase,
    private readonly removeUseCase: RemoveProgramaUseCase,
  ) {}

  create(dto: CreateProgramaDto)              { return this.createUseCase.execute(dto); }
  findAll()                                   { return this.findAllUseCase.execute(); }
  findOne(id: string)                         { return this.findOneUseCase.execute(id); }
  update(id: string, dto: UpdateProgramaDto)  { return this.updateUseCase.execute(id, dto); }
  remove(id: string)                          { return this.removeUseCase.execute(id); }
}