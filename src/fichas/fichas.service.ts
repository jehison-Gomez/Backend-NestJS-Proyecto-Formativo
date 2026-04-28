import { Injectable } from '@nestjs/common';
import { CreateFichaDto } from './application/dto/create-ficha.dto';
import { UpdateFichaDto } from './application/dto/update-ficha.dto';
import { CreateFichaUseCase } from './application/use-cases/create-ficha.use-case';
import { FindAllFichasUseCase } from './application/use-cases/find-all-fichas.use-case';
import { FindOneFichaUseCase } from './application/use-cases/find-one-ficha.use-case';
import { RemoveFichaUseCase } from './application/use-cases/remove-ficha.use-case';
import { UpdateFichaUseCase } from './application/use-cases/update-ficha.use-case';

@Injectable()
export class FichasService {
  constructor(
    private readonly createUseCase: CreateFichaUseCase,
    private readonly findAllUseCase: FindAllFichasUseCase,
    private readonly findOneUseCase: FindOneFichaUseCase,
    private readonly updateUseCase: UpdateFichaUseCase,
    private readonly removeUseCase: RemoveFichaUseCase,
  ) {}

  create(dto: CreateFichaDto)              { return this.createUseCase.execute(dto); }
  findAll()                                   { return this.findAllUseCase.execute(); }
  findOne(id: string)                         { return this.findOneUseCase.execute(id); }
  update(id: string, dto: UpdateFichaDto)  { return this.updateUseCase.execute(id, dto); }
  remove(id: string)                          { return this.removeUseCase.execute(id); }
}