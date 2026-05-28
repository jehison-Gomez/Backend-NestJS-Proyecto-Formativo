import { Injectable, NotFoundException } from '@nestjs/common';
import { MovimientoRepository } from '../../domain/movimiento.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveMovimientoUseCase {
  constructor(private readonly movimientoRepository: MovimientoRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.movimientoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Movimiento #${id} no encontrado`);

    try {
      await this.movimientoRepository.remove(id);
      return { message: `Movimiento #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
