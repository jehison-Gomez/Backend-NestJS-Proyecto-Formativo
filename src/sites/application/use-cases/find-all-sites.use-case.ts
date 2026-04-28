import { Inject, Injectable } from '@nestjs/common';
import { SITE_REPOSITORY } from 'src/sites/domain/site.repository';
import type { SiteRepository } from 'src/sites/domain/site.repository';
import { Site } from 'src/sites/domain/site.entity';

@Injectable()
export class FindAllSitesUseCase {
  constructor(
    @Inject(SITE_REPOSITORY)
    private readonly repo: SiteRepository,
  ) {}

  async execute(): Promise<Site[]> {
    return await this.repo.findAll();
  }
}
