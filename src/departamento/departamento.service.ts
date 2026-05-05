import { Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './application/dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './application/dto/update-departamento.dto';
import { CreateDepartamentoUseCase } from './application/use-cases/create-departamento.use-case';
import { FindAllDepartamentosUseCase } from './application/use-cases/find-all-departamentos.use-case';
import { FindOneDepartamentoUseCase } from './application/use-cases/find-one-departamento.use-case';
import { UpdateDepartamentoUseCase } from './application/use-cases/update-departamento.use-case';
import { RemoveDepartamentoUseCase } from './application/use-cases/remove-departamento.use-case';

@Injectable()
export class DepartamentoService {
  constructor(
    private readonly createDepartamentoUseCase: CreateDepartamentoUseCase,
    private readonly findAllDepartamentosUseCase: FindAllDepartamentosUseCase,
    private readonly findOneDepartamentoUseCase: FindOneDepartamentoUseCase,
    private readonly updateDepartamentoUseCase: UpdateDepartamentoUseCase,
    private readonly removeDepartamentoUseCase: RemoveDepartamentoUseCase,
  ) {}

  create(createDepartamentoDto: CreateDepartamentoDto) {
    return this.createDepartamentoUseCase.execute(createDepartamentoDto);
  }

  findAll() {
    return this.findAllDepartamentosUseCase.execute();
  }

  findOne(id: number) {
    return this.findOneDepartamentoUseCase.execute(id);
  }

  update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    return this.updateDepartamentoUseCase.execute(id, updateDepartamentoDto);
  }

  remove(id: number) {
    return this.removeDepartamentoUseCase.execute(id);
  }
}
