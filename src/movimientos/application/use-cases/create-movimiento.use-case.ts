import { Injectable } from '@nestjs/common';
import { MovimientoRepository } from '../../domain/movimiento.repository';
import { CreateMovimientoDto } from '../dto/create-movimiento.dto';
import { Movimiento } from '../../domain/movimiento.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreateMovimientoUseCase {
  constructor(private readonly movimientoRepository: MovimientoRepository) {}

  async execute(dto: CreateMovimientoDto): Promise<Movimiento> {
    try {
      const movimiento = new Movimiento({
        tipo:             dto.tipo,
        cantidad:         dto.cantidad,
        descripcion:      dto.descripcion,
        estado:           dto.estado,
        prestamo:          dto.prestamoId           ? { id: dto.prestamoId }           as any : null,
        devolucion:        dto.devolucionId          ? { id: dto.devolucionId }          as any : null,
        materialItem:      dto.materialItemId        ? { id: dto.materialItemId }        as any : null,
        materialConsumible: dto.materialConsumibleId ? { id: dto.materialConsumibleId }  as any : null,
        usuario:           dto.usuarioId             ? { id: dto.usuarioId }             as any : null,
      });
      return await this.movimientoRepository.create(movimiento);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
