import { Injectable } from '@nestjs/common';
import { CreateSedeDto } from './application/dto/create-sede.dto';
import { UpdateSedeDto } from './application/dto/update-sede.dto';
import { CreateSedeUseCase } from './application/use-cases/create-sede.use-case';
import { FindAllSedesUseCase } from './application/use-cases/find-all-sedes.use-case';
import { FindOneSedeUseCase } from './application/use-cases/find-one-sede.use-case';
import { UpdateSedeUseCase } from './application/use-cases/update-sede.use-case';
import { RemoveSedeUseCase } from './application/use-cases/remove-sede.use-case';

@Injectable()
export class SedeService {
  constructor(
    private readonly createSedeUseCase: CreateSedeUseCase,
    private readonly findAllSedesUseCase: FindAllSedesUseCase,
    private readonly findOneSedeUseCase: FindOneSedeUseCase,
    private readonly updateSedeUseCase: UpdateSedeUseCase,
    private readonly removeSedeUseCase: RemoveSedeUseCase,
  ) {}

  create(createSedeDto: CreateSedeDto) {
    return this.createSedeUseCase.execute(createSedeDto);
  }

  findAll() {
    return this.findAllSedesUseCase.execute();
  }

  findOne(id: number) {
    return this.findOneSedeUseCase.execute(id);
  }

  update(id: number, updateSedeDto: UpdateSedeDto) {
    return this.updateSedeUseCase.execute(id, updateSedeDto);
  }

  remove(id: number) {
    return this.removeSedeUseCase.execute(id);
  }
}
