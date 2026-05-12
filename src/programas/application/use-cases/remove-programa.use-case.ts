import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgramaRepository } from '../../domain/programa.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveProgramaUseCase {
  constructor(private readonly programaRepository: ProgramaRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.programaRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Programa #${id} no encontrado`);

    try {
      await this.programaRepository.remove(id);
      return { message: `Programa #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
