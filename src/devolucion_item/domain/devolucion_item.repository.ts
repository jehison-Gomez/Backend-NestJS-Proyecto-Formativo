import { DevolucionItem } from './devolucion_item.entity';

export abstract class DevolucionItemRepository {
  abstract create(di: DevolucionItem): Promise<DevolucionItem>;
  abstract findAll(): Promise<DevolucionItem[]>;
  abstract findOne(id: string): Promise<DevolucionItem | null>;
  abstract findByDevolucion(devolucionId: string): Promise<DevolucionItem[]>;
  abstract update(id: string, di: Partial<DevolucionItem>): Promise<DevolucionItem>;
  abstract remove(id: string): Promise<void>;
}
