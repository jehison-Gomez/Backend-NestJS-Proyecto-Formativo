// Puerto (interface) para el repositorio de Permiso
export interface PermisoRepository {
  findById(id: number): Promise<any>;
  findAll(): Promise<any[]>;
  create(permiso: any): Promise<any>;
  update(id: number, permiso: any): Promise<any>;
  delete(id: number): Promise<void>;
}
