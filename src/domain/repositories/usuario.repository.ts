// Puerto (interface) para el repositorio de Usuario
export interface UsuarioRepository {
  // Define aquí los métodos que el dominio necesita
  findById(id: number): Promise<any>;
  findAll(): Promise<any[]>;
  create(usuario: any): Promise<any>;
  update(id: number, usuario: any): Promise<any>;
  delete(id: number): Promise<void>;
}
