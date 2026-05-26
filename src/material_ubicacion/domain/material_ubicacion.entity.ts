import { Materiale } from 'src/materiales/domain/materiale.entity';
import { Ubicacion }  from 'src/ubicacion/domain/ubicacion.entity';

export class Material_ubicacion {
  id:             string;
  material:       Materiale;
  ubicacion:      Ubicacion;
  creadoEn:       Date;
  actualizadoEn:  Date;

  constructor(partial: Partial<Material_ubicacion>) {
    Object.assign(this, partial);
  }
}
