import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { PrestamoItemRepository } from 'src/prestamo_item/domain/prestamo_item.repository';
import { Material_itemRepository } from 'src/material_item/domain/material_item.repository';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';

@Injectable()
export class ReturnPrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly prestamoItemRepository: PrestamoItemRepository,
    private readonly materialItemRepository: Material_itemRepository,
  ) {}

  async execute(id: string): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne(id);
    if (!prestamo) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    if (prestamo.estado !== PrestamoEstado.ENTREGADO) {
      throw new BadRequestException(
        `Solo se puede devolver un préstamo en estado ENTREGADO. Estado actual: ${prestamo.estado}`,
      );
    }

    // Restaurar cada material_item a DISPONIBLE
    const items = await this.prestamoItemRepository.findByPrestamo(id);
    for (const pi of items) {
      if (pi.materialItemId) {
        await this.materialItemRepository.update(pi.materialItemId, {
          estado: Material_itemEstado.DISPONIBLE,
        });
      }
    }

    return this.prestamoRepository.update(id, { estado: PrestamoEstado.DEVUELTO });
  }
}
