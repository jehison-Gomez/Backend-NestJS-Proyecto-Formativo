import { Usuario } from './usuario.entity';

export abstract class UsuarioRepository {
  abstract findAll(): Promise<Usuario[]>;
  abstract findById(id: number): Promise<Usuario | null>;
  abstract create(usuario: Usuario): Promise<Usuario>;
}
