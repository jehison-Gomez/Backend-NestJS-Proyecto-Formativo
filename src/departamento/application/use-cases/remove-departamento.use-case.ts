import { Injectable } from '@nestjs/common';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class RemoveDepartamentoUseCase {
  constructor(private readonly repository: DepartamentoRepository) {}

  async execute(id: number): Promise<{ message: string }> {
    try {
      await this.repository.remove(id);
      return { message: `Departamento #${id} eliminado correctamente` };
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
