import { Injectable, NotFoundException } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { Area } from '../../domain/area.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class FindOneAreaUseCase {
  constructor(private readonly repository: AreaRepository) {}

  async execute(id: number): Promise<Area> {
    try {
      const area = await this.repository.findOne(id);
      if (!area) {
        throw new NotFoundException(`Area #${id} no encontrada`);
      }
      return area;
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
