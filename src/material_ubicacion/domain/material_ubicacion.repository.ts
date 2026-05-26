import { Material_ubicacion } from './material_ubicacion.entity';

export abstract class Material_ubicacionRepository {
  abstract create(material_ubicacion: Material_ubicacion): Promise<Material_ubicacion>;
  abstract findAll(): Promise<Material_ubicacion[]>;
  abstract findOne(id: string): Promise<Material_ubicacion | null>;
  abstract update(id: string, material_ubicacion: Partial<Material_ubicacion>): Promise<Material_ubicacion>;
  abstract remove(id: string): Promise<void>;
}
