import { Prestamo_material } from './prestamo_material.entity';

export abstract class Prestamo_materialRepository {
  abstract create(prestamo_material: Prestamo_material): Promise<Prestamo_material>;
  abstract findAll(): Promise<Prestamo_material[]>;
  abstract findOne(id: string): Promise<Prestamo_material | null>;
  abstract update(id: string, prestamo_material: Partial<Prestamo_material>): Promise<Prestamo_material>;
  abstract remove(id: string): Promise<void>;
}
