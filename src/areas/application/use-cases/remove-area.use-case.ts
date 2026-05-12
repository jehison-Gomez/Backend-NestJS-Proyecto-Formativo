import { Injectable, NotFoundException } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveAreaUseCase {
  constructor(private readonly areaRepository: AreaRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.areaRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Area #${id} no encontrado`);

    try {
      await this.areaRepository.remove(id);
      return { message: `Area #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
