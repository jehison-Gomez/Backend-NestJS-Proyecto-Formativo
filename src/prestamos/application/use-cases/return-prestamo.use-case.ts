import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { FindByPrestamoPrestamoItemUseCase } from 'src/prestamo_item/application/use-cases/find-by-prestamo-prestamo_item.use-case';
import { Material_itemRepository } from 'src/material_item/domain/material_item.repository';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';

@Injectable()
export class ReturnPrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly findByPrestamoPrestamoItem: FindByPrestamoPrestamoItemUseCase,
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

    const items = await this.findByPrestamoPrestamoItem.execute(id);
    for (const item of items) {
      await this.materialItemRepository.update(item.materialItemId, { estado: Material_itemEstado.DISPONIBLE });
    }

    return this.prestamoRepository.update(id, { estado: PrestamoEstado.DEVUELTO });
  }
}
