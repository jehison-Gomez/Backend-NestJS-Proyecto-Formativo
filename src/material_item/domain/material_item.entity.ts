import { Material_itemEstado } from './material_item-estado.enum';
import { Material_itemEstadoItem } from './material_item-estado_item';
import { Materiale } from 'src/materiales/domain/materiale.entity';
import { Ubicacion } from 'src/ubicacion/domain/ubicacion.entity';

export class Material_item {
  id: string;
  codigoSena: string;
  condicion: string;
  observacion?: string;
  estadoItem: Material_itemEstadoItem;
  estado: Material_itemEstado;
  materiale: Materiale;
  ubicacion?: Ubicacion | null;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Material_item>) {
    Object.assign(this, partial);
  }
}
