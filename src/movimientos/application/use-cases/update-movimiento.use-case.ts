import { Injectable, NotFoundException } from '@nestjs/common';
import { MovimientoRepository } from '../../domain/movimiento.repository';
import { UpdateMovimientoDto } from '../dto/update-movimiento.dto';
import { Movimiento } from '../../domain/movimiento.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateMovimientoUseCase {
  constructor(
    private readonly movimientoRepository: MovimientoRepository,
  ) {}

  async execute(id: string, dto: UpdateMovimientoDto): Promise<Movimiento> {
    const exists = await this.movimientoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Movimiento #${id} no encontrado`);

    const partial: Partial<Movimiento> = {};
    if (dto.tipo        !== undefined) partial.tipo        = dto.tipo;
    if (dto.cantidad    !== undefined) partial.cantidad    = dto.cantidad;
    if (dto.descripcion !== undefined) partial.descripcion = dto.descripcion;
    if (dto.estado      !== undefined) partial.estado      = dto.estado;

    try {
      return await this.movimientoRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
