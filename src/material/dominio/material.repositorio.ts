import { Material } from './material.entidad';

export interface MaterialRepositorio {
  guardar(material: Material): Promise<Material>;
  buscarTodos(): Promise<Material[]>;
  buscarPorId(id: number): Promise<Material | null>;
  eliminar(id: number): Promise<void>;
}


export const MATERIAL_REPOSITORIO = 'MATERIAL_REPOSITORIO';