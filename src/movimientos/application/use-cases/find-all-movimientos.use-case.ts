import { Injectable } from '@nestjs/common';
import { MovimientoRepository } from '../../domain/movimiento.repository';
import { Movimiento } from '../../domain/movimiento.entity';

@Injectable()
export class FindAllMovimientosUseCase {
  constructor(private readonly movimientoRepository: MovimientoRepository) {}

  async execute(): Promise<Movimiento[]> {
    return this.movimientoRepository.findAll();
  }
}
