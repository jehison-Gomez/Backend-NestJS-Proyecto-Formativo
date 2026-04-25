import { Centro } from '../../domain/entities/centro.entity';
import { CentroRepository } from '../../domain/repositories/centro.repository';

export class CentroUseCase {
  constructor(private readonly centroRepository: CentroRepository) {}

  findAll(): Promise<Centro[]> {
    return this.centroRepository.findAll();
  }
}