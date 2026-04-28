import { RolPermiso } from "./rol_permiso.entity";

export abstract class RolPermisoRepository {
  abstract create(rol_permiso: RolPermiso): Promise<RolPermiso>;
  abstract findAll(): Promise<RolPermiso[]>;
  abstract findOne(id: string): Promise<RolPermiso | null>;
  abstract update(id: string, rol_permiso: Partial<RolPermiso>): Promise<RolPermiso>;
  abstract remove(id: string): Promise<void>;
}