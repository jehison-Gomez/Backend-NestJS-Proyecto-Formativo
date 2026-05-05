import { Injectable } from '@nestjs/common';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { Departamento } from '../../domain/departamento.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class FindAllDepartamentosUseCase {
  constructor(private readonly repository: DepartamentoRepository) {}

  async execute(): Promise<Departamento[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
