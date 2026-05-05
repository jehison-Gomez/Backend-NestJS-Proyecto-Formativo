import { Injectable, NotFoundException } from '@nestjs/common';
import { CentroRepository } from '../../domain/centro.repository';
import { Centro } from '../../domain/centro.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class FindOneCentroUseCase {
  constructor(private readonly repository: CentroRepository) {}

  async execute(id: number): Promise<Centro> {
    try {
      const centro = await this.repository.findOne(id);
      if (!centro) {
        throw new NotFoundException(`Centro #${id} no encontrado`);
      }
      return centro;
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
