import { Injectable, NotFoundException } from '@nestjs/common';
import { SedeRepository } from '../../domain/sede.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveSedeUseCase {
  constructor(private readonly sedeRepository: SedeRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.sedeRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Sede #${id} no encontrado`);

    try {
      await this.sedeRepository.remove(id);
      return { message: `Sede #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
