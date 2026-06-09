import { Injectable } from '@nestjs/common';
import { PrestamoItemRepository } from '../../domain/prestamo_item.repository';
import { CreatePrestamoItemDto } from '../dto/create-prestamo_item.dto';
import { PrestamoItem } from '../../domain/prestamo_item.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreatePrestamoItemUseCase {
  constructor(private readonly prestamoItemRepository: PrestamoItemRepository) {}

  async execute(dto: CreatePrestamoItemDto): Promise<PrestamoItem> {
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
