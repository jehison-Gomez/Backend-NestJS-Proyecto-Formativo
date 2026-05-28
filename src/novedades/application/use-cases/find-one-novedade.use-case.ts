import { Injectable, NotFoundException } from '@nestjs/common';
import { NovedadeRepository } from '../../domain/novedade.repository';
import { Novedade } from '../../domain/novedade.entity';

@Injectable()
export class FindOneNovedadeUseCase {
  constructor(private readonly novedadeRepository: NovedadeRepository) {}

  async execute(id: string): Promise<Novedade> {
    const novedade = await this.novedadeRepository.findOne(id);
    if (!novedade) throw new NotFoundException(`Novedade #${id} no encontrado`);
    return novedade;
  }
}
