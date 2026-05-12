import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartamentoRepository } from '../../domain/departamento.repository';
import { UpdateDepartamentoDto } from '../dto/update-departamento.dto';
import { Departamento } from '../../domain/departamento.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateDepartamentoUseCase {
  constructor(private readonly departamentoRepository: DepartamentoRepository) {}

  async execute(id: string, dto: UpdateDepartamentoDto): Promise<Departamento> {
    const exists = await this.departamentoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Departamento #${id} no encontrado`);

    try {
      return await this.departamentoRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
