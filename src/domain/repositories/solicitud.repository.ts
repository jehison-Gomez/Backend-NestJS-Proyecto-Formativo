// Puerto (interface) para el repositorio de Solicitud
export interface SolicitudRepository {
  findById(id: number): Promise<any>;
  findAll(): Promise<any[]>;
  create(solicitud: any): Promise<any>;
  update(id: number, solicitud: any): Promise<any>;
  delete(id: number): Promise<void>;
}
