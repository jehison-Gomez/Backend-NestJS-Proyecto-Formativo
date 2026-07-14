import { UsuarioPermiso } from './usuario_permiso.entity';

export abstract class UsuarioPermisoRepository {
  abstract create(usuarioPermiso: UsuarioPermiso): Promise<UsuarioPermiso>;
  abstract findAll(): Promise<UsuarioPermiso[]>;
  abstract findOne(id: string): Promise<UsuarioPermiso | null>;
  abstract findByUsuario(usuarioId: string): Promise<UsuarioPermiso[]>;
  abstract remove(id: string): Promise<void>;
}
