import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { Departamento } from '../../domain/departamento.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class FindOneDepartamentoUseCase {
  constructor(private readonly repository: DepartamentoRepository) {}

  async execute(id: number): Promise<Departamento> {
    try {
      const departamento = await this.repository.findOne(id);
      if (!departamento) {
        throw new NotFoundException(`Departamento #${id} no encontrado`);
      }
      return departamento;
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
