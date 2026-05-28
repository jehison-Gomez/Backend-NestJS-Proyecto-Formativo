import { Injectable, NotFoundException } from '@nestjs/common';
import { DevolucioneRepository } from '../../domain/devolucione.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveDevolucioneUseCase {
  constructor(private readonly devolucioneRepository: DevolucioneRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.devolucioneRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Devolucione #${id} no encontrado`);

    try {
      await this.devolucioneRepository.remove(id);
      return { message: `Devolucione #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
