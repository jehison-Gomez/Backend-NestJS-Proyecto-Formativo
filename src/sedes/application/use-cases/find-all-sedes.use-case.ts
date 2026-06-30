import { Injectable } from '@nestjs/common';
import { SedeRepository } from '../../domain/sede.repository';
import { Sede } from '../../domain/sede.entity';

@Injectable()
export class FindAllSedesUseCase {
  constructor(private readonly sedeRepository: SedeRepository) {}

  async execute(): Promise<Sede[]> {
    return this.sedeRepository.findAll();
  }
}
