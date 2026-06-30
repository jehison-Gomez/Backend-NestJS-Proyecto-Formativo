import { Injectable } from '@nestjs/common';
import { CentroRepository } from '../../domain/centro.repository';
import { Centro } from '../../domain/centro.entity';

@Injectable()
export class FindAllCentrosUseCase {
  constructor(private readonly centroRepository: CentroRepository) {}

  async execute(): Promise<Centro[]> {
    return this.centroRepository.findAll();
  }
}
