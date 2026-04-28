import { Material } from './material.entity';

export interface MaterialRepository {
  save(material: Material): Promise<Material>;
  findAll(): Promise<Material[]>;
  findById(id: number): Promise<Material | null>;
  delete(id: number): Promise<void>;
}

export const MATERIAL_REPOSITORY = 'MATERIAL_REPOSITORY';
