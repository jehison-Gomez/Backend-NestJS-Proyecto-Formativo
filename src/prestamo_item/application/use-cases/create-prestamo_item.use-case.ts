import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoItemRepository } from '../../domain/prestamo_item.repository';
import { CreatePrestamoItemDto } from '../dto/create-prestamo_item.dto';
import { PrestamoItem } from '../../domain/prestamo_item.entity';
import { handleDbErrors } from '../handle-db-errors';
import { Material_itemRepository } from 'src/material_item/domain/material_item.repository';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';

@Injectable()
export class CreatePrestamoItemUseCase {
  constructor(
    private readonly prestamoItemRepository: PrestamoItemRepository,
    private readonly materialItemRepository: Material_itemRepository,
  ) {}

  async execute(dto: CreatePrestamoItemDto): Promise<PrestamoItem> {
    // Validar que el material_item exista y esté disponible
    const item = await this.materialItemRepository.findOne(dto.materialItemId);
    if (!item) throw new NotFoundException(`Material item #${dto.materialItemId} no encontrado`);

    if (item.estado !== Material_itemEstado.DISPONIBLE) {
      throw new BadRequestException(
        `El material "${item.codigoSena}" no está disponible para préstamo. Estado actual: ${item.estado}`,
      );
    }

    try {
      const prestamoItem = new PrestamoItem({
        prestamoId:           dto.prestamoId,
        materialItemId:       dto.materialItemId,
        incluidoEnAprobacion: dto.incluidoEnAprobacion ?? true,
        observacion:          dto.observacion,
        estado:               dto.estado,
      });
      return await this.prestamoItemRepository.create(prestamoItem);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
