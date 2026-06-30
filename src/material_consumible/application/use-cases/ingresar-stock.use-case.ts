import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Material_consumibleRepository } from '../../domain/material_consumible.repository';
import { IngresarStockDto } from '../dto/ingresar-stock.dto';
import { Material_consumible } from '../../domain/material_consumible.entity';
import { MovimientoOrmEntity } from 'src/movimientos/infrastructure/persistence/movimiento.orm-entity';
import { MovimientoTipo } from 'src/movimientos/domain/movimiento-tipo.enum';
import { MovimientoEstado } from 'src/movimientos/domain/movimiento-estado.enum';

@Injectable()
export class IngresarStockUseCase {
  constructor(
    private readonly material_consumibleRepository: Material_consumibleRepository,
    private readonly dataSource: DataSource,
  ) {}

  async execute(id: string, dto: IngresarStockDto): Promise<Material_consumible> {
    const consumible = await this.material_consumibleRepository.findOne(id);
    if (!consumible) throw new NotFoundException(`Material consumible #${id} no encontrado`);

    const nuevoStock = Number(consumible.stockActual) + Number(dto.cantidad);

    await this.dataSource.getRepository(MovimientoOrmEntity).save({
      tipo:               MovimientoTipo.ENTRADA,
      cantidad:           dto.cantidad,
      descripcion:        dto.descripcion ?? `Ingreso de stock: +${dto.cantidad} ${consumible.unidadMedida}`,
      estado:             MovimientoEstado.ACTIVO,
      materialConsumible: { id },
    });

    return this.material_consumibleRepository.update(id, { stockActual: nuevoStock });
  }
}
