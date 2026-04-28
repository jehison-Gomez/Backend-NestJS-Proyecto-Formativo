import { Inject, Injectable } from '@nestjs/common';
import type { SpaceRepository } from 'src/spaces/domain/space.repository';
import { SPACE_REPOSITORY } from 'src/spaces/domain/space.repository';
import { CreateSpaceDto } from '../dto/create-space.dto';
import { Space } from 'src/spaces/domain/space.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class CreateSpaceUseCase {
  constructor(
    @Inject(SPACE_REPOSITORY)
    private readonly repo: SpaceRepository,
  ) {}

  async execute(dto: CreateSpaceDto): Promise<Space> {
    const space = new Space();
    space.name = dto.name;
    space.type = dto.type;
    space.area_id = dto.area_id;

    try {
      return await this.repo.save(space);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
