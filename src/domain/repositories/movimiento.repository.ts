// Puerto (interface) para el repositorio de Movimiento
export interface MovimientoRepository {
  findById(id: number): Promise<any>;
  findAll(): Promise<any[]>;
  create(movimiento: any): Promise<any>;
  update(id: number, movimiento: any): Promise<any>;
  delete(id: number): Promise<void>;
}
