import { Injectable } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { Area } from '../../domain/area.entity';
import { UpdateAreaDto } from '../dto/update-area.dto';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class UpdateAreaUseCase {
  constructor(private readonly repository: AreaRepository) {}

  async execute(id: number, updateAreaDto: UpdateAreaDto): Promise<Area> {
    try {
      return await this.repository.update(id, updateAreaDto);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
