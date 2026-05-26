import { Ubicacion } from './ubicacion.entity';

export abstract class UbicacionRepository {
  abstract create(ubicacion: Ubicacion): Promise<Ubicacion>;
  abstract findAll(): Promise<Ubicacion[]>;
  abstract findOne(id: string): Promise<Ubicacion | null>;
  abstract update(id: string, ubicacion: Partial<Ubicacion>): Promise<Ubicacion>;
  abstract remove(id: string): Promise<void>;
}
