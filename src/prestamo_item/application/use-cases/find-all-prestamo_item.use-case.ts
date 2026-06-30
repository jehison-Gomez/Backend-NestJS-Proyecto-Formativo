import { Injectable } from '@nestjs/common';
import { PrestamoItemRepository } from '../../domain/prestamo_item.repository';
import { PrestamoItem } from '../../domain/prestamo_item.entity';

@Injectable()
export class FindAllPrestamoItemUseCase {
  constructor(private readonly prestamoItemRepository: PrestamoItemRepository) {}

  async execute(): Promise<PrestamoItem[]> {
    return this.prestamoItemRepository.findAll();
  }
}
