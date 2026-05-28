import { Injectable, NotFoundException } from '@nestjs/common';
import { MovimientoRepository } from '../../domain/movimiento.repository';
import { Movimiento } from '../../domain/movimiento.entity';

@Injectable()
export class FindOneMovimientoUseCase {
  constructor(private readonly movimientoRepository: MovimientoRepository) {}

  async execute(id: string): Promise<Movimiento> {
    const movimiento = await this.movimientoRepository.findOne(id);
    if (!movimiento) throw new NotFoundException(`Movimiento #${id} no encontrado`);
    return movimiento;
  }
}
