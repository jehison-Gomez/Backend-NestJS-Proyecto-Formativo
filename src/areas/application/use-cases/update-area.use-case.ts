import { Injectable, NotFoundException } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { UpdateAreaDto } from '../dto/update-area.dto';
import { Area } from '../../domain/area.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateAreaUseCase {
  constructor(private readonly areaRepository: AreaRepository) {}

  async execute(id: string, dto: UpdateAreaDto): Promise<Area> {
    const exists = await this.areaRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Area #${id} no encontrado`);

    try {
      return await this.areaRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
