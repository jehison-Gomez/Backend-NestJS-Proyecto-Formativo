import { Categoria_material } from './categoria_material.entity';

export abstract class Categoria_materialRepository {
  abstract create(categoria_material: Categoria_material): Promise<Categoria_material>;
  abstract findAll(sedeId?: string | null): Promise<Categoria_material[]>;
  abstract findOne(id: string): Promise<Categoria_material | null>;
  abstract update(id: string, categoria_material: Partial<Categoria_material>): Promise<Categoria_material>;
  abstract remove(id: string): Promise<void>;
}
