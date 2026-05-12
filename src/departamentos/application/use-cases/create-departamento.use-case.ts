import { Injectable } from '@nestjs/common';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { CreateDepartamentoDto } from '../dto/create-departamento.dto';
import { Departamento } from '../../domain/departamento.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreateDepartamentoUseCase {
  constructor(private readonly departamentoRepository: DepartamentoRepository) {}

  async execute(dto: CreateDepartamentoDto): Promise<Departamento> {
    try {
      const departamento = new Departamento({ ...dto });
      return await this.departamentoRepository.create(departamento);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
