import { Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemovePrestamoUseCase {
  constructor(private readonly prestamoRepository: PrestamoRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.prestamoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    try {
      await this.prestamoRepository.remove(id);
      return { message: `Prestamo #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
