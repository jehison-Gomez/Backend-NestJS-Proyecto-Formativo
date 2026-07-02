import { Tipo_ubicacionEstado } from './tipo_ubicacion-estado.enum';
import type { Ubicacion } from 'src/ubicacion/domain/ubicacion.entity';

export class Tipo_ubicacion {
  id: string;
  nombre: string;
  descripcion: string;
  estado: Tipo_ubicacionEstado;
  sedeId?: string | null;
  ubicaciones?: Ubicacion[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Tipo_ubicacion>) {
    Object.assign(this, partial);
  }
}
