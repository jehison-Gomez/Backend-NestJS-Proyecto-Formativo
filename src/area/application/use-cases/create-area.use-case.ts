import { Injectable } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { Area } from '../../domain/area.entity';
import { CreateAreaDto } from '../dto/create-area.dto';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class CreateAreaUseCase {
  constructor(private readonly repository: AreaRepository) {}

  async execute(createAreaDto: CreateAreaDto): Promise<Area> {
    try {
      const area = new Area({
        ...createAreaDto,
        estado: createAreaDto.estado ?? true,
      });
      return await this.repository.create(area);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
