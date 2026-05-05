import { Injectable } from '@nestjs/common';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { Departamento } from '../../domain/departamento.entity';
import { UpdateDepartamentoDto } from '../dto/update-departamento.dto';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class UpdateDepartamentoUseCase {
  constructor(private readonly repository: DepartamentoRepository) {}

  async execute(
    id: number,
    updateDepartamentoDto: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    try {
      return await this.repository.update(id, updateDepartamentoDto);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
