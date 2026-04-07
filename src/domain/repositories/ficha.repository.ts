// Puerto (interface) para el repositorio de Ficha
export interface FichaRepository {
  findById(id: number): Promise<any>;
  findAll(): Promise<any[]>;
  create(ficha: any): Promise<any>;
  update(id: number, ficha: any): Promise<any>;
  delete(id: number): Promise<void>;
}
