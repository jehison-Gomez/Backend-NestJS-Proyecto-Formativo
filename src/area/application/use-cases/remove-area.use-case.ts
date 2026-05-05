import { Injectable } from '@nestjs/common';
import { AreaRepository } from '../../domain/area.repository';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class RemoveAreaUseCase {
  constructor(private readonly repository: AreaRepository) {}

  async execute(id: number): Promise<{ message: string }> {
    try {
      await this.repository.remove(id);
      return { message: `Area #${id} eliminada correctamente` };
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
