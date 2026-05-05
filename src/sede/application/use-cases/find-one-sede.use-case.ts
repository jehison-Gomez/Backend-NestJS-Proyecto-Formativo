import { Injectable, NotFoundException } from '@nestjs/common';
import { SedeRepository } from '../../domain/sede.repository';
import { Sede } from '../../domain/sede.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class FindOneSedeUseCase {
  constructor(private readonly repository: SedeRepository) {}

  async execute(id: number): Promise<Sede> {
    try {
      const sede = await this.repository.findOne(id);
      if (!sede) {
        throw new NotFoundException(`Sede #${id} no encontrada`);
      }
      return sede;
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
