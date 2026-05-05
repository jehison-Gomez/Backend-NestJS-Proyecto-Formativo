import { Injectable } from '@nestjs/common';
import { CentroRepository } from '../../domain/centro.repository';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class RemoveCentroUseCase {
  constructor(private readonly repository: CentroRepository) {}

  async execute(id: number): Promise<{ message: string }> {
    try {
      await this.repository.remove(id);
      return { message: `Centro #${id} eliminado correctamente` };
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
