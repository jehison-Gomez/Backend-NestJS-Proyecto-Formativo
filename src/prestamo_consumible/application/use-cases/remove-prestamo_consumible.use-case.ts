import { Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoConsumibleRepository } from '../../domain/prestamo_consumible.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemovePrestamoConsumibleUseCase {
  constructor(private readonly repo: PrestamoConsumibleRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.repo.findOne(id);
    if (!exists) throw new NotFoundException(`PrestamoConsumible #${id} no encontrado`);
    try {
      await this.repo.remove(id);
      return { message: `PrestamoConsumible #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
