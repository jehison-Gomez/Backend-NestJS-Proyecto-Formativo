import { PermisoEstado } from './permiso-estado.enum';

export class Permiso {
  id: string;
  nombre: string;
  descripcion: string;
  modulo: string;
  accion: string;
  estado: PermisoEstado;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Permiso>) {
    Object.assign(this, partial);
  }
}
