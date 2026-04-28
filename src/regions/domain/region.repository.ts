import { Region } from './region.entity';

export interface RegionRepository {
  save(region: Region): Promise<Region>;
  findAll(): Promise<Region[]>;
  findById(id: string): Promise<Region | null>;
  delete(id: string): Promise<void>;
}

// Esto es el puerto - le dice a la aplicacion "qué operaciones existen" sin importar cómo se implementan.

// Token de inyección
export const REGION_REPOSITORY = 'REGION_REPOSITORY';
