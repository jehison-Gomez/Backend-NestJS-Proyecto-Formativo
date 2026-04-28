import { Permiso } from "./permiso.entity";

export abstract class PermisoRepository {
  abstract create(permiso: Permiso): Promise<Permiso>;
  abstract findAll(): Promise<Permiso[]>;
  abstract findOne(id: string): Promise<Permiso | null>;
  abstract update(id: string, permiso: Partial<Permiso>): Promise<Permiso>;
  abstract remove(id: string): Promise<void>;
}