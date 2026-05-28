import { Material_item } from './material_item.entity';

export abstract class Material_itemRepository {
  abstract create(material_item: Material_item): Promise<Material_item>;
  abstract findAll(): Promise<Material_item[]>;
  abstract findOne(id: string): Promise<Material_item | null>;
  abstract update(id: string, material_item: Partial<Material_item>): Promise<Material_item>;
  abstract remove(id: string): Promise<void>;
}
