import { Categoria_materialEstado } from './categoria_material-estado.enum';
import type { Materiale } from 'src/materiales/domain/materiale.entity';

export class Categoria_material {
  id: string;
  nombre: string;
  descripcion: string;
  estado: Categoria_materialEstado;
  sedeId?: string | null;
  materiales?: Materiale[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Categoria_material>) {
    Object.assign(this, partial);
  }
}
