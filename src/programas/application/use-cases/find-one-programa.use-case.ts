import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgramaRepository } from '../../domain/programa.repository';
import { Programa } from '../../domain/programa.entity';

@Injectable()
export class FindOneProgramaUseCase {
  constructor(private readonly programaRepository: ProgramaRepository) {}

  async execute(id: string): Promise<Programa> {
    const programa = await this.programaRepository.findOne(id);
    if (!programa) throw new NotFoundException(`Programa #${id} no encontrado`);
    return programa;
  }
}
