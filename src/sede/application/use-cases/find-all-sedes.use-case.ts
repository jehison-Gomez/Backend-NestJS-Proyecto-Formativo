import { Injectable } from '@nestjs/common';
import { SedeRepository } from '../../domain/sede.repository';
import { Sede } from '../../domain/sede.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class FindAllSedesUseCase {
  constructor(private readonly repository: SedeRepository) {}

  async execute(): Promise<Sede[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
