import { Injectable } from '@nestjs/common';
import { SedeRepository } from '../../domain/sede.repository';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class RemoveSedeUseCase {
  constructor(private readonly repository: SedeRepository) {}

  async execute(id: number): Promise<{ message: string }> {
    try {
      await this.repository.remove(id);
      return { message: `Sede #${id} eliminada correctamente` };
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
