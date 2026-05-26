import { MaterialeEstado } from './materiale-estado.enum';
import { Categoria_material } from 'src/categoria_material/domain/categoria_material.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';

export class Materiale {
  id: string;
  nombre: string;
  descripcion: string;
  estado: MaterialeEstado;
  categoriaMaterial: Categoria_material;
  ficha: Ficha;
  materialUbicaciones?: import('src/material_ubicacion/domain/material_ubicacion.entity').Material_ubicacion[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Materiale>) {
    Object.assign(this, partial);
  }
}
