import { Material_itemEstado } from './material_item-estado.enum';
import { Material_itemEstadoItem } from './material_item-estado_item';

export class Material_item {
  id: string;
  codigoSena: string;
  condicion: string;
  observacion: string;
  estadoItem: Material_itemEstadoItem;
  estado: Material_itemEstado;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Material_item>) {
    Object.assign(this, partial);
  }
}
