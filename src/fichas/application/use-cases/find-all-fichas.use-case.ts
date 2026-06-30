import { Injectable } from '@nestjs/common';
import { FichaRepository } from '../../domain/ficha.repository';
import { Ficha } from '../../domain/ficha.entity';

@Injectable()
export class FindAllFichasUseCase {
  constructor(private readonly fichaRepository: FichaRepository) {}

  async execute(_sedeId?: string | null): Promise<Ficha[]> {
    return this.fichaRepository.findAll();
  }
}
