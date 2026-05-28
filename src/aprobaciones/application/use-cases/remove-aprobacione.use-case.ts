import { Injectable, NotFoundException } from '@nestjs/common';
import { AprobacioneRepository } from '../../domain/aprobacione.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveAprobacioneUseCase {
  constructor(private readonly aprobacioneRepository: AprobacioneRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.aprobacioneRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Aprobacione #${id} no encontrado`);

    try {
      await this.aprobacioneRepository.remove(id);
      return { message: `Aprobacione #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
