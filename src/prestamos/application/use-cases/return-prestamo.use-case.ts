import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { CreateMovimientoUseCase } from 'src/movimientos/application/use-cases/create-movimiento.use-case';
import { UpdateMaterial_itemUseCase } from 'src/material_item/application/use-cases/update-material_item.use-case';
import { UpdateMaterial_consumibleUseCase } from 'src/material_consumible/application/use-cases/update-material_consumible.use-case';
import { FindOneMaterial_consumibleUseCase } from 'src/material_consumible/application/use-cases/find-one-material_consumible.use-case';
import { MovimientoTipo } from 'src/movimientos/domain/movimiento-tipo.enum';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';

@Injectable()
export class ReturnPrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    @Inject(forwardRef(() => CreateMovimientoUseCase))
    private readonly createMovimiento: CreateMovimientoUseCase,
    private readonly updateMaterialItem: UpdateMaterial_itemUseCase,
    private readonly updateMaterialConsumible: UpdateMaterial_consumibleUseCase,
    private readonly findOneMaterialConsumible: FindOneMaterial_consumibleUseCase,
  ) {}

  async execute(id: string): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne(id);
    if (!prestamo) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    if (prestamo.estado !== PrestamoEstado.ACTIVO) {
      throw new BadRequestException(
        `Solo se puede devolver un préstamo en estado ACTIVO (entregado). Estado actual: ${prestamo.estado}`,
      );
    }

    // Devolver items físicos: estado → disponible + movimiento ENTRADA
    for (const item of (prestamo.materialItems ?? [])) {
      await this.updateMaterialItem.execute(item.id, { estado: Material_itemEstado.ACTIVO });
      await this.createMovimiento.execute({
        tipo:           MovimientoTipo.ENTRADA,
        cantidad:       1,
        descripcion:    `Devolución de préstamo #${id}`,
        prestamoId:     id,
        materialItemId: item.id,
      });
    }

    // Restaurar stock de consumibles + movimiento ENTRADA
    for (const detalle of (prestamo.materialConsumibles ?? [])) {
      const consumible = await this.findOneMaterialConsumible.execute(detalle.materialConsumible.id);
      await this.updateMaterialConsumible.execute(consumible.id, {
        stockActual: consumible.stockActual + detalle.cantidadPrestada,
      });
      await this.createMovimiento.execute({
        tipo:                 MovimientoTipo.ENTRADA,
        cantidad:             detalle.cantidadPrestada,
        descripcion:          `Devolución consumible de préstamo #${id}`,
        prestamoId:           id,
        materialConsumibleId: consumible.id,
      });
    }

    return this.prestamoRepository.update(id, {
      estado:          PrestamoEstado.DEVUELTO,
      fechaDevolucion: new Date(),
    });
  }
}
