import { Injectable } from '@nestjs/common';
import { ProgramaRepository } from '../../domain/programa.repository';
import { CreateProgramaDto } from '../dto/create-programa.dto';
import { Programa } from '../../domain/programa.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneAreaUseCase } from 'src/areas/application/use-cases/find-one-area.use-case';

@Injectable()
export class CreateProgramaUseCase {
  constructor(
    private readonly programaRepository: ProgramaRepository,
    private readonly findOneArea: FindOneAreaUseCase,
  ) {}

  async execute(dto: CreateProgramaDto): Promise<Programa> {
    const area = await this.findOneArea.execute(dto.areaId);

    try {
      const programa = new Programa({
        nombre: dto.nombre,
        codigo: dto.codigo,
        nivelFormacion: dto.nivelFormacion,
        estado: dto.estado,
        area,
      });
      return await this.programaRepository.create(programa);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
