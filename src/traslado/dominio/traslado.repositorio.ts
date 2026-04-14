import { Traslado } from './traslado.entidad';

export interface TrasladoRepositorio {
  guardar(t: Traslado): Promise<Traslado>;
  buscarTodos(): Promise<Traslado[]>;
  buscarPorId(id: number): Promise<Traslado | null>;
  eliminar(id: number): Promise<void>;
}
export const TRASLADO_REPOSITORIO = 'TRASLADO_REPOSITORIO';