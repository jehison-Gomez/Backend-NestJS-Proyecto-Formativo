import { Departamento } from '../../domain/entities/departamento.entity';
import { DepartamentoRepository } from '../../domain/repositories/departamento.repository';

export class DepartamentoUseCase {
  constructor(private readonly departamentoRepository: DepartamentoRepository) {}

  findAll(): Promise<Departamento[]> {
    return this.departamentoRepository.findAll();
  }
}