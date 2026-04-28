import { Center } from './center.entity';

export interface CenterRepository {
  save(center: Center): Promise<Center>;
  findAll(): Promise<Center[]>;
  findById(id: string): Promise<Center | null>;
  delete(id: string): Promise<void>;
}

// Esto es el puerto - le dice a la aplicacion "qué operaciones existen" sin importar cómo se implementan.

// Token de inyección
export const CENTER_REPOSITORY = 'CENTER_REPOSITORY';
