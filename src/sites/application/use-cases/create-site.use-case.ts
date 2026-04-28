import { Inject, Injectable } from '@nestjs/common';
import type { SiteRepository } from 'src/sites/domain/site.repository';
import { CreateSiteDto } from '../dto/create-site.dto';
import { Site } from 'src/sites/domain/site.entity';
import { handleDBErrors } from '../handle-db-errors';
import { SITE_REPOSITORY } from 'src/sites/domain/site.repository';

@Injectable()
export class CreateSiteUseCase {
  constructor(
    @Inject(SITE_REPOSITORY)
    private readonly repo: SiteRepository,
  ) {}

  async execute(dto: CreateSiteDto): Promise<Site> {
    const site = new Site();
    site.name = dto.name;
    site.address = dto.address;
    site.center_id = dto.center_id;

    try {
      return await this.repo.save(site);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
