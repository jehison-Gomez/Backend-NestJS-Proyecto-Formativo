import { MaterialeEstado } from './materiale-estado.enum';
import { TipoMateriale } from './tipo-materiale.enum';
import { Categoria_material } from 'src/categoria_material/domain/categoria_material.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';
import { Ubicacion } from 'src/ubicacion/domain/ubicacion.entity';

export class Materiale {
  id: string;
  nombre: string;
  descripcion: string;
  sku?: string | null;
  codigoUnspsc?: string | null;
  tipo: TipoMateriale;
  estado: MaterialeEstado;
  categoriaMaterial: Categoria_material;
  ficha: Ficha;
  ubicacion?: Ubicacion;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Materiale>) {
    Object.assign(this, partial);
  }
}
