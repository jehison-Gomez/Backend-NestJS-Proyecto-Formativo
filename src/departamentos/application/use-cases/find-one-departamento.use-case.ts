import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { Departamento } from '../../domain/departamento.entity';

@Injectable()
export class FindOneDepartamentoUseCase {
  constructor(private readonly departamentoRepository: DepartamentoRepository) {}

  async execute(id: string): Promise<Departamento> {
    const departamento = await this.departamentoRepository.findOne(id);
    if (!departamento) throw new NotFoundException(`Departamento #${id} no encontrado`);
    return departamento;
  }
}
