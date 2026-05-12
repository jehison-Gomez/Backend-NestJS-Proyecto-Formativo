import { Injectable } from '@nestjs/common';
import { ProgramaRepository } from '../../domain/programa.repository';
import { CreateProgramaDto } from '../dto/create-programa.dto';
import { Programa } from '../../domain/programa.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreateProgramaUseCase {
  constructor(private readonly programaRepository: ProgramaRepository) {}

  async execute(dto: CreateProgramaDto): Promise<Programa> {
    try {
      const programa = new Programa({ ...dto });
      return await this.programaRepository.create(programa);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
