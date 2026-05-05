import { Injectable } from '@nestjs/common';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { Departamento } from '../../domain/departamento.entity';
import { CreateDepartamentoDto } from '../dto/create-departamento.dto';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class CreateDepartamentoUseCase {
  constructor(private readonly repository: DepartamentoRepository) {}

  async execute(
    createDepartamentoDto: CreateDepartamentoDto,
  ): Promise<Departamento> {
    try {
      const departamento = new Departamento({
        ...createDepartamentoDto,
        estado: createDepartamentoDto.estado ?? true,
      });
      return await this.repository.create(departamento);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
