import { Usuario } from "./usuario.entity";

export abstract class UsuarioRepository {
  abstract create(Usuario: Usuario): Promise<Usuario>;
  abstract findAll(): Promise<Usuario[]>;
  abstract findOne(id: string): Promise<Usuario | null>;
  abstract update(id: string, usuario: Partial<Usuario>): Promise<Usuario>;
  abstract remove(id: string): Promise<void>;
}