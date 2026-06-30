import { Usuario } from './usuario.entity';

export interface UsuarioFilters {
  search?: string;
  rolId?: string;
  estado?: string;
  sedeId?: string | null;
  soloRoles?: string[];
  page?: number;
  limit?: number;
}

export interface UsuariosPaginados {
  usuarios: Usuario[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export abstract class UsuarioRepository {
  abstract create(usuario: Usuario): Promise<Usuario>;
  abstract findAll(sedeId?: string | null): Promise<Usuario[]>;
  abstract findWithFilters(filters: UsuarioFilters): Promise<UsuariosPaginados>;
  abstract findOne(id: string): Promise<Usuario | null>;
  abstract findByCorreo(correo: string): Promise<Usuario | null>;
  abstract update(id: string, usuario: Partial<Usuario>): Promise<Usuario>;
  abstract remove(id: string): Promise<void>;
}
