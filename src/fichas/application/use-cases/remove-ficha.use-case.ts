import { Injectable, NotFoundException } from '@nestjs/common';
import { FichaRepository } from '../../domain/ficha.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveFichaUseCase {
  constructor(private readonly fichaRepository: FichaRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.fichaRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Ficha #${id} no encontrado`);

    try {
      await this.fichaRepository.remove(id);
      return { message: `Ficha #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
