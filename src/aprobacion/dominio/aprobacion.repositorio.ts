import { Aprobacion } from './aprobacion.entidad.js';
export interface AprobacionRepositorio {
  guardar(a: Aprobacion): Promise<Aprobacion>;
  buscarTodos(): Promise<Aprobacion[]>;
  buscarPorId(id: number): Promise<Aprobacion | null>;
  buscarPorPrestamo(idPrestamo: number): Promise<Aprobacion[]>;
  eliminar(id: number): Promise<void>;
}
export const APROBACION_REPOSITORIO = 'APROBACION_REPOSITORIO';