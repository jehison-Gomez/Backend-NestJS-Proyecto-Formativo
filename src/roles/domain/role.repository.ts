import { Role } from './role.entity';

export abstract class RoleRepository {
  abstract create(role: Role): Promise<Role>;
  abstract findAll(): Promise<Role[]>;
  abstract findOne(id: string): Promise<Role | null>;
  abstract update(id: string, role: Partial<Role>): Promise<Role>;
  abstract remove(id: string): Promise<void>;
}
