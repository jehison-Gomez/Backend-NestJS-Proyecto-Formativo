import { Injectable } from '@nestjs/common';
import { MovimientoRepository } from '../../domain/movimiento.repository';
import { CreateMovimientoDto } from '../dto/create-movimiento.dto';
import { Movimiento } from '../../domain/movimiento.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOnePrestamoUseCase } from 'src/prestamos/application/use-cases/find-one-prestamo.use-case';

@Injectable()
export class CreateMovimientoUseCase {
  constructor(
    private readonly movimientoRepository: MovimientoRepository,
    private readonly findOnePrestamo: FindOnePrestamoUseCase,
  ) {}

  async execute(dto: CreateMovimientoDto): Promise<Movimiento> {
    const prestamo = dto.prestamoId
      ? await this.findOnePrestamo.execute(dto.prestamoId)
      : undefined;

    try {
      const movimiento = new Movimiento({
        tipo:        dto.tipo,
        cantidad:    dto.cantidad,
        descripcion: dto.descripcion,
        estado:      dto.estado,
        prestamo,
      });
      return await this.movimientoRepository.create(movimiento);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
