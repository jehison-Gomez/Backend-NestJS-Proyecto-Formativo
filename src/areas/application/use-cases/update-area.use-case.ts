import { Inject, Injectable } from '@nestjs/common';
import type { AreaRepository } from 'src/areas/domain/area.repository';
import { FindOneAreaUseCase } from './find-one-area.use-case';
import { UpdateAreaDto } from '../dto/update-area.dto';
import { Area } from 'src/areas/domain/area.entity';
import { handleDBErrors } from '../handle-db-errors';
import { AREA_REPOSITORY } from 'src/areas/domain/area.repository';

@Injectable()
export class UpdateAreaUseCase {
  constructor(
    @Inject(AREA_REPOSITORY)
    private readonly repo: AreaRepository,
    private readonly findOne: FindOneAreaUseCase,
  ) {}

  async execute(id: string, dto: UpdateAreaDto): Promise<Area> {
    const area = await this.findOne.execute(id);
    area.name = dto.name ?? area.name;
    area.site_id = dto.site_id ?? area.site_id;

    try {
      return await this.repo.save(area);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
