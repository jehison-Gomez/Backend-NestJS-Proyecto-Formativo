import { MaterialUbicacion } from './material-ubicacion.entidad';
export interface MaterialUbicacionRepositorio {
  guardar(mu: MaterialUbicacion): Promise<MaterialUbicacion>;
  buscarTodos(): Promise<MaterialUbicacion[]>;
  buscarPorId(id: number): Promise<MaterialUbicacion | null>;
  buscarPorMaterial(materialId: number): Promise<MaterialUbicacion[]>;
  eliminar(id: number): Promise<void>;
}
export const MATERIAL_UBICACION_REPOSITORIO = 'MATERIAL_UBICACION_REPOSITORIO';