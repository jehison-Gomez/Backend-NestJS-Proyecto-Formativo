import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgramaRepository } from '../../domain/programa.repository';
import { UpdateProgramaDto } from '../dto/update-programa.dto';
import { Programa } from '../../domain/programa.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateProgramaUseCase {
  constructor(private readonly programaRepository: ProgramaRepository) {}

  async execute(id: string, dto: UpdateProgramaDto): Promise<Programa> {
    const exists = await this.programaRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Programa #${id} no encontrado`);

    try {
      return await this.programaRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
