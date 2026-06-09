import { Movimiento } from './movimiento.entity';

export abstract class MovimientoRepository {
  abstract create(movimiento: Movimiento): Promise<Movimiento>;
  abstract findAll(): Promise<Movimiento[]>;
  abstract findOne(id: string): Promise<Movimiento | null>;
  abstract findByMaterialItem(materialItemId: string): Promise<Movimiento[]>;
  abstract findByMaterialConsumible(materialConsumibleId: string): Promise<Movimiento[]>;
  abstract findByMateriale(materialeId: string): Promise<Movimiento[]>;
  abstract getLastSaldo(materialItemId?: string, materialConsumibleId?: string): Promise<number>;
  abstract update(id: string, movimiento: Partial<Movimiento>): Promise<Movimiento>;
  abstract remove(id: string): Promise<void>;
}
