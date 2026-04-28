import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Area } from 'src/areas/domain/area.entity';
import type { AreaRepository } from 'src/areas/domain/area.repository';
import { AREA_REPOSITORY } from 'src/areas/domain/area.repository';

@Injectable()
export class FindOneAreaUseCase {
  constructor(
    @Inject(AREA_REPOSITORY)
    private readonly repo: AreaRepository,
  ) {}

  async execute(id: string): Promise<Area> {
    const area = await this.repo.findById(id);
    if (!area) throw new NotFoundException(`Area with id "${id}" not found`);
    return area;
  }
}
