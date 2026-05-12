import { Injectable } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { CreateAreaDto } from '../dto/create-area.dto';
import { Area } from '../../domain/area.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneSedeUseCase } from 'src/sedes/application/use-cases/find-one-sede.use-case';

@Injectable()
export class CreateAreaUseCase {
  constructor(
    private readonly areaRepository: AreaRepository,
    private readonly findOneSede: FindOneSedeUseCase,
  ) {}

  async execute(dto: CreateAreaDto): Promise<Area> {
    const sede = await this.findOneSede.execute(dto.sedeId);

    try {
      const area = new Area({
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        estado: dto.estado,
        sede,
      });
      return await this.areaRepository.create(area);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
