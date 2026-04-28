import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Region } from 'src/regions/domain/region.entity';
import type { RegionRepository } from 'src/regions/domain/region.repository';
import { REGION_REPOSITORY } from 'src/regions/domain/region.repository';

@Injectable()
export class FindOneRegionUseCase {
  constructor(
    @Inject(REGION_REPOSITORY)
    private readonly repo: RegionRepository,
  ) {}

  async execute(id: string): Promise<Region> {
    const region = await this.repo.findById(id);
    if (!region)
      throw new NotFoundException(`Region with id "${id}" not found`);
    return region;
  }
}
