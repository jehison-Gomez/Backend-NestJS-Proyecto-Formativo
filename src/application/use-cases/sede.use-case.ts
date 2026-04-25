import { Sede } from '../../domain/entities/sede.entity';
import { SedeRepository } from '../../domain/repositories/sede.repository';

export class SedeUseCase {
  constructor(private readonly sedeRepository: SedeRepository) {}

  findAll(): Promise<Sede[]> {
    return this.sedeRepository.findAll();
  }
}