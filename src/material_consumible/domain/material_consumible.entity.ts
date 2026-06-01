import { Material_consumibleEstado } from './material_consumible-estado.enum';
import { Materiale } from 'src/materiales/domain/materiale.entity';

export class Material_consumible {
  id: string;
  stockActual: number;
  stockMinimo: number;
  unidadMedida: string;
  fechaVencimiento: Date;
  estado: Material_consumibleEstado;
  materiale: Materiale;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Material_consumible>) {
    Object.assign(this, partial);
  }
}
