import { Rol_permiso } from './rol_permiso.entity';

export abstract class Rol_permisoRepository {
  abstract create(rol_permiso: Rol_permiso): Promise<Rol_permiso>;
  abstract findAll(): Promise<Rol_permiso[]>;
  abstract findOne(id: string): Promise<Rol_permiso | null>;
  abstract findByRoleId(roleId: string): Promise<Rol_permiso[]>;
  abstract update(id: string, rol_permiso: Partial<Rol_permiso>): Promise<Rol_permiso>;
  abstract remove(id: string): Promise<void>;
  abstract removeByRoleId(roleId: string): Promise<void>;
  abstract createBulk(roleId: string, permisosIds: string[]): Promise<Rol_permiso[]>;
}
