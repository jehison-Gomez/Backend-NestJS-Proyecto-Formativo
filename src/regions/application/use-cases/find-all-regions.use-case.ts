import { Inject, Injectable } from '@nestjs/common';
import { Region } from 'src/regions/domain/region.entity';
import type { RegionRepository } from 'src/regions/domain/region.repository';
import { REGION_REPOSITORY } from 'src/regions/domain/region.repository';

@Injectable()
export class FindAllRegionsUseCase {
  constructor(
    @Inject(REGION_REPOSITORY)
    private readonly repo: RegionRepository,
  ) {}

  async execute(): Promise<Region[]> {
    return await this.repo.findAll();
  }
}
