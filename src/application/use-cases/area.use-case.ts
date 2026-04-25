import { Area } from '../../domain/entities/area.entity';
import { AreaRepository } from '../../domain/repositories/area.repository';

export class AreaUseCase {
  constructor(private readonly areaRepository: AreaRepository) {}

  findAll(): Promise<Area[]> {
    return this.areaRepository.findAll();
  }
}