import { Injectable, NotFoundException } from '@nestjs/common';
import { CentroRepository } from '../../domain/centro.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveCentroUseCase {
  constructor(private readonly centroRepository: CentroRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.centroRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Centro #${id} no encontrado`);

    try {
      await this.centroRepository.remove(id);
      return { message: `Centro #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
