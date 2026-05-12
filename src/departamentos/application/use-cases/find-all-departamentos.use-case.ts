import { Injectable } from '@nestjs/common';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { Departamento } from '../../domain/departamento.entity';

@Injectable()
export class FindAllDepartamentosUseCase {
  constructor(private readonly departamentoRepository: DepartamentoRepository) {}

  async execute(): Promise<Departamento[]> {
    return this.departamentoRepository.findAll();
  }
}
