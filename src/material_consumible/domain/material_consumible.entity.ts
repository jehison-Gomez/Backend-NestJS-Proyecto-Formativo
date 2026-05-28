import { Material_consumibleEstado } from './material_consumible-estado.enum';

export class Material_consumible {
  id: string;
  stockActual: number;
  stockMinimo: number;
  unidadMedida: string;
  fechaVencimiento: Date;
  estado: Material_consumibleEstado;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Material_consumible>) {
    Object.assign(this, partial);
  }
}
