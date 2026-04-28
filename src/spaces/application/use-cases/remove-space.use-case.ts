import { Inject, Injectable } from '@nestjs/common';
import type { SpaceRepository } from 'src/spaces/domain/space.repository';
import { SPACE_REPOSITORY } from 'src/spaces/domain/space.repository';
import { FindOneSpaceUseCase } from './find-one-space.use-case';

@Injectable()
export class RemoveSpaceUseCase {
  constructor(
    @Inject(SPACE_REPOSITORY)
    private readonly repo: SpaceRepository,
    private readonly findOne: FindOneSpaceUseCase,
  ) {}

  async execute(id: string): Promise<void> {
    await this.findOne.execute(id); // Valida que exista
    await this.repo.delete(id);
  }
}
