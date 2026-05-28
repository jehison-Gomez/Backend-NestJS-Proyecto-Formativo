import { MaterialeEstado } from './materiale-estado.enum';
import { TipoMateriale } from './tipo-materiale.enum';
import { Categoria_material } from 'src/categoria_material/domain/categoria_material.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';
import { Material_item } from 'src/material_item/domain/material_item.entity';
import { Material_consumible } from 'src/material_consumible/domain/material_consumible.entity';

export class Materiale {
  id: string;
  nombre: string;
  descripcion: string;
  estado: MaterialeEstado;
  categoriaMaterial: Categoria_material;
  ficha: Ficha;
  tipoMaterial?: TipoMateriale;
  materialItem?: Material_item | null;
  materialConsumible?: Material_consumible | null;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Materiale>) {
    Object.assign(this, partial);
  }
}
