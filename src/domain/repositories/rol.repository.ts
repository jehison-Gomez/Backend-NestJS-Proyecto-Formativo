// Puerto (interface) para el repositorio de Rol
export interface RolRepository {
  findById(id: number): Promise<any>;
  findAll(): Promise<any[]>;
  create(rol: any): Promise<any>;
  update(id: number, rol: any): Promise<any>;
  delete(id: number): Promise<void>;
}
