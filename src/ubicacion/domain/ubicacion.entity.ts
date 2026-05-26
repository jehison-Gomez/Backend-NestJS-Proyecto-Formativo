import { UbicacionEstado } from './ubicacion-estado.enum';
import { Tipo_ubicacion } from 'src/tipo_ubicacion/domain/tipo_ubicacion.entity';
import { Area } from 'src/areas/domain/area.entity';

export class Ubicacion {
  id: string;
  nombre: string;
  descripcion: string;
  estado: UbicacionEstado;
  tipoUbicacion: Tipo_ubicacion;
  area: Area;
  materialUbicaciones?: import('src/material_ubicacion/domain/material_ubicacion.entity').Material_ubicacion[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Ubicacion>) {
    Object.assign(this, partial);
  }
}
