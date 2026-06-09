import { Injectable } from '@nestjs/common';
import { MovimientoRepository } from '../../domain/movimiento.repository';
import { CreateMovimientoDto } from '../dto/create-movimiento.dto';
import { Movimiento } from '../../domain/movimiento.entity';
import { MovimientoTipo } from '../../domain/movimiento-tipo.enum';
import { handleDbErrors } from '../handle-db-errors';
import { FindOnePrestamoUseCase } from 'src/prestamos/application/use-cases/find-one-prestamo.use-case';
import { FindOneMaterial_itemUseCase } from 'src/material_item/application/use-cases/find-one-material_item.use-case';
import { FindOneMaterial_consumibleUseCase } from 'src/material_consumible/application/use-cases/find-one-material_consumible.use-case';

@Injectable()
export class CreateMovimientoUseCase {
  constructor(
    private readonly movimientoRepository: MovimientoRepository,
    private readonly findOnePrestamo: FindOnePrestamoUseCase,
    private readonly findOneMaterialItem: FindOneMaterial_itemUseCase,
    private readonly findOneMaterialConsumible: FindOneMaterial_consumibleUseCase,
  ) {}

  async execute(dto: CreateMovimientoDto): Promise<Movimiento> {
    const prestamo           = dto.prestamoId           ? await this.findOnePrestamo.execute(dto.prestamoId)                       : undefined;
    const materialItem       = dto.materialItemId       ? await this.findOneMaterialItem.execute(dto.materialItemId)               : undefined;
    const materialConsumible = dto.materialConsumibleId ? await this.findOneMaterialConsumible.execute(dto.materialConsumibleId)   : undefined;

    const lastSaldo = await this.movimientoRepository.getLastSaldo(dto.materialItemId, dto.materialConsumibleId);
    const saldo = this.calcularSaldo(dto.tipo, lastSaldo, dto.cantidad);

    try {
      const movimiento = new Movimiento({
        tipo:             dto.tipo,
        cantidad:         dto.cantidad,
        descripcion:      dto.descripcion,
        saldo,
        estado:           dto.estado,
        prestamo,
        materialItem,
        materialConsumible,
      });
      return await this.movimientoRepository.create(movimiento);
    } catch (error) {
      handleDbErrors(error);
    }
  }

  private calcularSaldo(tipo: MovimientoTipo, lastSaldo: number, cantidad: number): number {
    if (tipo === MovimientoTipo.SALIDA) return lastSaldo - cantidad;
    if (tipo === MovimientoTipo.CAMBIO_UBICACION) return lastSaldo;
    return lastSaldo + cantidad; // ENTRADA, AJUSTE
  }
}
