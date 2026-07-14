import { Material_consumible } from './material_consumible.entity';

export abstract class Material_consumibleRepository {
  abstract create(material_consumible: Material_consumible): Promise<Material_consumible>;
  abstract findAll(sedeId?: string | null): Promise<Material_consumible[]>;
  abstract findBajoStock(sedeId?: string | null): Promise<Material_consumible[]>;
  abstract findOne(id: string): Promise<Material_consumible | null>;
  abstract update(id: string, material_consumible: Partial<Material_consumible>): Promise<Material_consumible>;
  abstract remove(id: string): Promise<void>;
}
