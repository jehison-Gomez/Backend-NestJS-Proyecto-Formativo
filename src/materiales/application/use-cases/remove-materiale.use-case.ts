import { Injectable, NotFoundException } from '@nestjs/common';
import { MaterialeRepository } from '../../domain/materiale.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveMaterialeUseCase {
  constructor(private readonly materialeRepository: MaterialeRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.materialeRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Materiale #${id} no encontrado`);

    try {
      await this.materialeRepository.remove(id);
      return { message: `Materiale #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
