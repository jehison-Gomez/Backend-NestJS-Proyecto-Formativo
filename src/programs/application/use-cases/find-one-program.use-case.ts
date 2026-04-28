import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Program } from 'src/programs/domain/program.entity';
import type { ProgramRepository } from 'src/programs/domain/program.repository';
import { PROGRAM_REPOSITORY } from 'src/programs/domain/program.repository';

@Injectable()
export class FindOneProgramUseCase {
  constructor(
    @Inject(PROGRAM_REPOSITORY)
    private readonly repo: ProgramRepository,
  ) {}

  async execute(id: string): Promise<Program> {
    const program = await this.repo.findById(id);
    if (!program)
      throw new NotFoundException(`Program with id "${id}" not found`);
    return program;
  }
}
