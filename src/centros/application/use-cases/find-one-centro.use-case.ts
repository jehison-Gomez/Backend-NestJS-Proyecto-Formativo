import { Injectable, NotFoundException } from '@nestjs/common';
import { CentroRepository } from '../../domain/centro.repository';
import { Centro } from '../../domain/centro.entity';

@Injectable()
export class FindOneCentroUseCase {
  constructor(private readonly centroRepository: CentroRepository) {}

  async execute(id: string): Promise<Centro> {
    const centro = await this.centroRepository.findOne(id);
    if (!centro) throw new NotFoundException(`Centro #${id} no encontrado`);
    return centro;
  }
}
