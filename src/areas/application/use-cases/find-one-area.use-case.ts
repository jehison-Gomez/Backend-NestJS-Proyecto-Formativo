import { Injectable, NotFoundException } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { Area } from '../../domain/area.entity';

@Injectable()
export class FindOneAreaUseCase {
  constructor(private readonly areaRepository: AreaRepository) {}

  async execute(id: string): Promise<Area> {
    const area = await this.areaRepository.findOne(id);
    if (!area) throw new NotFoundException(`Area #${id} no encontrado`);
    return area;
  }
}
