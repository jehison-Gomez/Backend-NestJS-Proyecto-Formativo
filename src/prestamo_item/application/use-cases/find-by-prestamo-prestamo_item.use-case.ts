import { Injectable } from '@nestjs/common';
import { PrestamoItemRepository } from '../../domain/prestamo_item.repository';
import { PrestamoItem } from '../../domain/prestamo_item.entity';

@Injectable()
export class FindByPrestamoPrestamoItemUseCase {
  constructor(private readonly prestamoItemRepository: PrestamoItemRepository) {}

  async execute(prestamoId: string): Promise<PrestamoItem[]> {
    return this.prestamoItemRepository.findByPrestamo(prestamoId);
  }
}
