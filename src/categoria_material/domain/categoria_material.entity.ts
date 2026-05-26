import { Categoria_materialEstado } from './categoria_material-estado.enum';

export class Categoria_material {
  id: string;
  nombre: string;
  descripcion: string;
  estado: Categoria_materialEstado;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Categoria_material>) {
    Object.assign(this, partial);
  }
}
