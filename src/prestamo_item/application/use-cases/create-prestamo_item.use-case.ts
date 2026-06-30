import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoItemRepository } from '../../domain/prestamo_item.repository';
import { CreatePrestamoItemDto } from '../dto/create-prestamo_item.dto';
import { PrestamoItem } from '../../domain/prestamo_item.entity';
import { Material_itemRepository } from 'src/material_item/domain/material_item.repository';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreatePrestamoItemUseCase {
  constructor(
    private readonly prestamoItemRepository: PrestamoItemRepository,
    private readonly materialItemRepository: Material_itemRepository,
  ) {}

  async execute(dto: CreatePrestamoItemDto): Promise<PrestamoItem> {
    const materialItem = await this.materialItemRepository.findOne(dto.materialItemId);
    if (!materialItem) throw new NotFoundException(`Material item #${dto.materialItemId} no encontrado`);

    if (materialItem.estado !== Material_itemEstado.DISPONIBLE) {
      throw new BadRequestException(
        `El material "${materialItem.materiale?.nombre ?? materialItem.id}" (${materialItem.codigoSena}) no está disponible. Estado actual: ${materialItem.estado}`,
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
      const creado = await this.prestamoItemRepository.create(prestamoItem);
      await this.materialItemRepository.update(dto.materialItemId, { estado: Material_itemEstado.PRESTADO });
      return creado;
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
