import { Kardex } from './kardex.entity';

export abstract class KardexRepository {
  abstract create(kardex: Kardex): Promise<Kardex>;
  abstract findAll(): Promise<Kardex[]>;
  abstract findOne(id: string): Promise<Kardex | null>;
  abstract findByMaterialConsumible(materialConsumibleId: string): Promise<Kardex[]>;
  abstract findByMaterialItem(materialItemId: string): Promise<Kardex[]>;
  abstract getLastSaldo(materialConsumibleId: string): Promise<number>;
  abstract update(id: string, kardex: Partial<Kardex>): Promise<Kardex>;
  abstract remove(id: string): Promise<void>;
}
