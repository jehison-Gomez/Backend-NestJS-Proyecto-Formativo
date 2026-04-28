import { Inject, Injectable } from '@nestjs/common';
import type { ProgramRepository } from 'src/programs/domain/program.repository';
import { PROGRAM_REPOSITORY } from 'src/programs/domain/program.repository';
import { FindOneProgramUseCase } from './find-one-program.use-case';

@Injectable()
export class RemoveProgramUseCase {
  constructor(
    @Inject(PROGRAM_REPOSITORY)
    private readonly repo: ProgramRepository,
    private readonly findOne: FindOneProgramUseCase,
  ) {}

  async execute(id: string): Promise<void> {
    await this.findOne.execute(id); // Valida que exista
    await this.repo.delete(id);
  }
}
