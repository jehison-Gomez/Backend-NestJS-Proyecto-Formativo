import { Ubicacion } from "./ubicacion.entity";

export interface UbicacionRepository {
  save(ubicacion: Ubicacion): Promise<Ubicacion>;
  findAll(): Promise<Ubicacion[]>;
  findById(id: string): Promise<Ubicacion | null>; // Aquí: cambiar number por string
  delete(id: string): Promise<void>;              // Aquí: cambiar number por string
}

export const UBICACION_REPOSITORY = 'UBICACION_REPOSITORY';