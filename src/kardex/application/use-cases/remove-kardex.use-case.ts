import { Injectable, NotFoundException } from '@nestjs/common';
import { KardexRepository } from '../../domain/kardex.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveKardexUseCase {
  constructor(private readonly kardexRepository: KardexRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.kardexRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Kardex #${id} no encontrado`);

    try {
      await this.kardexRepository.remove(id);
      return { message: `Kardex #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
