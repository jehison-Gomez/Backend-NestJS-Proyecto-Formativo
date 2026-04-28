import { Inject, Injectable } from '@nestjs/common';
import type { ProgramRepository } from 'src/programs/domain/program.repository';
import { PROGRAM_REPOSITORY } from 'src/programs/domain/program.repository';
import { CreateProgramDto } from '../dto/create-program.dto';
import { Program } from 'src/programs/domain/program.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class CreateProgramUseCase {
  constructor(
    @Inject(PROGRAM_REPOSITORY)
    private readonly repo: ProgramRepository,
  ) {}

  async execute(dto: CreateProgramDto): Promise<Program> {
    const program = new Program();
    program.name = dto.name;
    program.description = dto.description;
    program.area_id = dto.area_id;

    try {
      return await this.repo.save(program);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
