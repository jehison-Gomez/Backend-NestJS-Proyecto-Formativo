import { Injectable } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { Area } from '../../domain/area.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class FindAllAreasUseCase {
  constructor(private readonly repository: AreaRepository) {}

  async execute(): Promise<Area[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
