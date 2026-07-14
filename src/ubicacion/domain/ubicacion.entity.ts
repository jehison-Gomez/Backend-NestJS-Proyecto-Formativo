import { UbicacionEstado } from './ubicacion-estado.enum';
import { Tipo_ubicacion } from 'src/tipo_ubicacion/domain/tipo_ubicacion.entity';
import { Area } from 'src/areas/domain/area.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

export class Ubicacion {
  id: string;
  nombre: string;
  descripcion: string;
  estado: UbicacionEstado;
  tipoUbicacion: Tipo_ubicacion;
  area: Area;
  encargado?: Usuario | null;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Ubicacion>) {
    Object.assign(this, partial);
  }
}
