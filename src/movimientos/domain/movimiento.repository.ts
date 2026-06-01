import { Movimiento } from './movimiento.entity';

export abstract class MovimientoRepository {
  abstract create(movimiento: Movimiento): Promise<Movimiento>;
  abstract findAll(): Promise<Movimiento[]>;
  abstract findOne(id: string): Promise<Movimiento | null>;
  abstract findByMaterialItem(materialItemId: string): Promise<Movimiento[]>;
  abstract update(id: string, movimiento: Partial<Movimiento>): Promise<Movimiento>;
  abstract remove(id: string): Promise<void>;
}
