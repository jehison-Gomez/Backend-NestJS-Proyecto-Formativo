import { PrestamoItem } from './prestamo_item.entity';

export abstract class PrestamoItemRepository {
  abstract create(prestamoItem: PrestamoItem): Promise<PrestamoItem>;
  abstract findAll(): Promise<PrestamoItem[]>;
  abstract findOne(id: string): Promise<PrestamoItem | null>;
  abstract findByPrestamo(prestamoId: string): Promise<PrestamoItem[]>;
  abstract update(id: string, prestamoItem: Partial<PrestamoItem>): Promise<PrestamoItem>;
  abstract remove(id: string): Promise<void>;
}
