import { Injectable } from '@nestjs/common';
import { CreateCentroDto } from './application/dto/create-centro.dto';
import { UpdateCentroDto } from './application/dto/update-centro.dto';
import { CreateCentroUseCase } from './application/use-cases/create-centro.use-case';
import { FindAllCentrosUseCase } from './application/use-cases/find-all-centros.use-case';
import { FindOneCentroUseCase } from './application/use-cases/find-one-centro.use-case';
import { UpdateCentroUseCase } from './application/use-cases/update-centro.use-case';
import { RemoveCentroUseCase } from './application/use-cases/remove-centro.use-case';

@Injectable()
export class CentroService {
  constructor(
    private readonly createCentroUseCase: CreateCentroUseCase,
    private readonly findAllCentrosUseCase: FindAllCentrosUseCase,
    private readonly findOneCentroUseCase: FindOneCentroUseCase,
    private readonly updateCentroUseCase: UpdateCentroUseCase,
    private readonly removeCentroUseCase: RemoveCentroUseCase,
  ) {}

  create(createCentroDto: CreateCentroDto) {
    return this.createCentroUseCase.execute(createCentroDto);
  }

  findAll() {
    return this.findAllCentrosUseCase.execute();
  }

  findOne(id: number) {
    return this.findOneCentroUseCase.execute(id);
  }

  update(id: number, updateCentroDto: UpdateCentroDto) {
    return this.updateCentroUseCase.execute(id, updateCentroDto);
  }

  remove(id: number) {
    return this.removeCentroUseCase.execute(id);
  }
}
