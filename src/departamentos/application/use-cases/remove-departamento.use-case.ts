import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveDepartamentoUseCase {
  constructor(private readonly departamentoRepository: DepartamentoRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.departamentoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Departamento #${id} no encontrado`);

    try {
      await this.departamentoRepository.remove(id);
      return { message: `Departamento #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
