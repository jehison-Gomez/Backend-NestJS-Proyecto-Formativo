// Puerto (interface) para el repositorio de Asignacion
export interface AsignacionRepository {
  findById(id: number): Promise<any>;
  findAll(): Promise<any[]>;
  create(asignacion: any): Promise<any>;
  update(id: number, asignacion: any): Promise<any>;
  delete(id: number): Promise<void>;
}
