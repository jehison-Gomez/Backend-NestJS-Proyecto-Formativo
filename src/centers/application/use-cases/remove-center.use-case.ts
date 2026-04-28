import { Inject, Injectable } from '@nestjs/common';
import { CENTER_REPOSITORY } from 'src/centers/domain/center.repository';
import type { CenterRepository } from 'src/centers/domain/center.repository';
import { FindOneCenterUseCase } from './find-one-center.use-case';

@Injectable()
export class RemoveCenterUseCase {
  constructor(
    @Inject(CENTER_REPOSITORY)
    private readonly repo: CenterRepository,
    private readonly findOne: FindOneCenterUseCase,
  ) {}

  async execute(id: string): Promise<void> {
    await this.findOne.execute(id); // Valida que exista
    await this.repo.delete(id);
  }
}
