import { Tipo_ubicacionEstado } from './tipo_ubicacion-estado.enum';

export class Tipo_ubicacion {
  id: string;
  nombre: string;
  descripcion: string;
  estado: Tipo_ubicacionEstado;
  ubicaciones?: import('src/ubicacion/domain/ubicacion.entity').Ubicacion[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Tipo_ubicacion>) {
    Object.assign(this, partial);
  }
}
