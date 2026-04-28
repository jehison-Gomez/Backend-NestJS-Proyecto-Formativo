import { Inject, Injectable } from '@nestjs/common';
import { SITE_REPOSITORY } from 'src/sites/domain/site.repository';
import type { SiteRepository } from 'src/sites/domain/site.repository';
import { FindOneSiteUseCase } from './find-one-site.use-case';
import { UpdateSiteDto } from '../dto/update-site.dto';
import { Site } from 'src/sites/domain/site.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class UpdateSiteUseCase {
  constructor(
    @Inject(SITE_REPOSITORY)
    private readonly repo: SiteRepository,
    private readonly findOne: FindOneSiteUseCase,
  ) {}

  async execute(id: string, dto: UpdateSiteDto): Promise<Site> {
    const site = await this.findOne.execute(id);
    site.name = dto.name ?? site.name;
    site.address = dto.address ?? site.address;
    site.center_id = dto.center_id ?? site.center_id;

    try {
      return await this.repo.save(site);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
