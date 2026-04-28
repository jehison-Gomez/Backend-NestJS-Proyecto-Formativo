import { Prestamo } from './prestamo.entidad.js';

export interface PrestamoRepositorio {
  guardar(p: Prestamo): Promise<Prestamo>;
  buscarTodos(): Promise<Prestamo[]>;
  buscarPorId(id: number): Promise<Prestamo | null>;
  eliminar(id: number): Promise<void>;
}
export const PRESTAMO_REPOSITORIO = 'PRESTAMO_REPOSITORIO';