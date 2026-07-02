import { Tipo_ubicacion } from './tipo_ubicacion.entity';

export abstract class Tipo_ubicacionRepository {
  abstract create(tipo_ubicacion: Tipo_ubicacion): Promise<Tipo_ubicacion>;
  abstract findAll(sedeId?: string | null): Promise<Tipo_ubicacion[]>;
  abstract findOne(id: string): Promise<Tipo_ubicacion | null>;
  abstract update(id: string, tipo_ubicacion: Partial<Tipo_ubicacion>): Promise<Tipo_ubicacion>;
  abstract remove(id: string): Promise<void>;
}
