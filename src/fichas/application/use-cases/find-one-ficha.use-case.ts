import { Injectable, NotFoundException } from '@nestjs/common';
import { FichaRepository } from '../../domain/ficha.repository';
import { Ficha } from '../../domain/ficha.entity';

@Injectable()
export class FindOneFichaUseCase {
  constructor(private readonly fichaRepository: FichaRepository) {}

  async execute(id: string): Promise<Ficha> {
    const ficha = await this.fichaRepository.findOne(id);
    if (!ficha) throw new NotFoundException(`Ficha #${id} no encontrado`);
    return ficha;
  }
}
