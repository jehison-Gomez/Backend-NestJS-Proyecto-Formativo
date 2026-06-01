import { MaterialeEstado } from './materiale-estado.enum';
import { TipoMateriale } from './tipo-materiale.enum';
import { Categoria_material } from 'src/categoria_material/domain/categoria_material.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';

export class Materiale {
  id: string;
  nombre: string;
  descripcion: string;
  estado: MaterialeEstado;
  categoriaMaterial: Categoria_material;
  ficha: Ficha;
  tipoMaterial: TipoMateriale;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Materiale>) {
    Object.assign(this, partial);
  }
}
