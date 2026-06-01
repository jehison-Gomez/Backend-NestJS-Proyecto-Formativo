import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { CreateMovimientoUseCase } from 'src/movimientos/application/use-cases/create-movimiento.use-case';
import { UpdateMaterial_itemUseCase } from 'src/material_item/application/use-cases/update-material_item.use-case';
import { MovimientoTipo } from 'src/movimientos/domain/movimiento-tipo.enum';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';

@Injectable()
export class ReturnPrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    @Inject(forwardRef(() => CreateMovimientoUseCase))
    private readonly createMovimiento: CreateMovimientoUseCase,
    private readonly updateMaterialItem: UpdateMaterial_itemUseCase,
  ) {}

  async execute(id: string): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne(id);
    if (!prestamo) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    if (prestamo.estado !== PrestamoEstado.ACTIVO) {
      throw new BadRequestException(
        `Solo se puede devolver un préstamo en estado ACTIVO (entregado). Estado actual: ${prestamo.estado}`,
      );
    }

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

    return this.prestamoRepository.update(id, {
      estado:          PrestamoEstado.DEVUELTO,
      fechaDevolucion: new Date(),
    });
  }
}
