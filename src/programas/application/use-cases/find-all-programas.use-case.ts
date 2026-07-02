import { Injectable } from '@nestjs/common';
import { ProgramaRepository } from '../../domain/programa.repository';
import { Programa } from '../../domain/programa.entity';

@Injectable()
export class FindAllProgramasUseCase {
  constructor(private readonly programaRepository: ProgramaRepository) {}

  async execute(sedeId?: string | null): Promise<Programa[]> {
    return this.programaRepository.findAll(sedeId);
  }
}
