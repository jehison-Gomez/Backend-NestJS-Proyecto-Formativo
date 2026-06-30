import { Injectable, NotFoundException } from '@nestjs/common';
import { NovedadeRepository } from '../../domain/novedade.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveNovedadeUseCase {
  constructor(private readonly novedadeRepository: NovedadeRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.novedadeRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Novedade #${id} no encontrado`);

    try {
      await this.novedadeRepository.remove(id);
      return { message: `Novedade #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
