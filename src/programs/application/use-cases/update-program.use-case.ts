import { Inject, Injectable } from '@nestjs/common';
import type { ProgramRepository } from 'src/programs/domain/program.repository';
import { FindOneProgramUseCase } from './find-one-program.use-case';
import { UpdateProgramDto } from '../dto/update-program.dto';
import { Program } from 'src/programs/domain/program.entity';
import { handleDBErrors } from '../handle-db-errors';
import { PROGRAM_REPOSITORY } from 'src/programs/domain/program.repository';

@Injectable()
export class UpdateProgramUseCase {
  constructor(
    @Inject(PROGRAM_REPOSITORY)
    private readonly repo: ProgramRepository,
    private readonly findOne: FindOneProgramUseCase,
  ) {}

  async execute(id: string, dto: UpdateProgramDto): Promise<Program> {
    const program = await this.findOne.execute(id);
    program.name = dto.name ?? program.name;
    program.description = dto.description ?? program.description;
    program.area_id = dto.area_id ?? program.area_id;
    try {
      return await this.repo.save(program);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
