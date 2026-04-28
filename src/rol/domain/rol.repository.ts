import { Rol } from "./rol.entity";

export abstract class RolRepository {
  abstract create(rol: Rol): Promise<Rol>;
  abstract findAll(): Promise<Rol[]>;
  abstract findOne(id: string): Promise<Rol | null>;
  abstract update(id: string, rol: Partial<Rol>): Promise<Rol>;
  abstract remove(id: string): Promise<void>;
}