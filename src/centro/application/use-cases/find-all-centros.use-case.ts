import { Injectable } from '@nestjs/common';
import { CentroRepository } from '../../domain/centro.repository';
import { Centro } from '../../domain/centro.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class FindAllCentrosUseCase {
  constructor(private readonly repository: CentroRepository) {}

  async execute(): Promise<Centro[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
