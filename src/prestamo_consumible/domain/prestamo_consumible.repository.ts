import { PrestamoConsumible } from './prestamo_consumible.entity';

export abstract class PrestamoConsumibleRepository {
  abstract create(pc: PrestamoConsumible): Promise<PrestamoConsumible>;
  abstract findAll(): Promise<PrestamoConsumible[]>;
  abstract findOne(id: string): Promise<PrestamoConsumible | null>;
  abstract findByPrestamo(prestamoId: string): Promise<PrestamoConsumible[]>;
  abstract update(id: string, pc: Partial<PrestamoConsumible>): Promise<PrestamoConsumible>;
  abstract remove(id: string): Promise<void>;
}
