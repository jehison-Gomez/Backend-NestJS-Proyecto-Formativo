import { Injectable } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { Area } from '../../domain/area.entity';

@Injectable()
export class FindAllAreasUseCase {
  constructor(private readonly areaRepository: AreaRepository) {}

  async execute(): Promise<Area[]> {
    return this.areaRepository.findAll();
  }
}
