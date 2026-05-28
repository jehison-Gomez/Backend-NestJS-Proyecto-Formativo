import { Injectable } from '@nestjs/common';
import { NovedadeRepository } from '../../domain/novedade.repository';
import { Novedade } from '../../domain/novedade.entity';

@Injectable()
export class FindAllNovedadesUseCase {
  constructor(private readonly novedadeRepository: NovedadeRepository) {}

  async execute(): Promise<Novedade[]> {
    return this.novedadeRepository.findAll();
  }
}
