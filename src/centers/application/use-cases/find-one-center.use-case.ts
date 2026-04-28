import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Center } from 'src/centers/domain/center.entity';
import type { CenterRepository } from 'src/centers/domain/center.repository';
import { CENTER_REPOSITORY } from 'src/centers/domain/center.repository';

@Injectable()
export class FindOneCenterUseCase {
  constructor(
    @Inject(CENTER_REPOSITORY)
    private readonly repo: CenterRepository,
  ) {}

  async execute(id: string): Promise<Center> {
    const center = await this.repo.findById(id);
    if (!center)
      throw new NotFoundException(`Center with id "${id}" not found`);
    return center;
  }
}
