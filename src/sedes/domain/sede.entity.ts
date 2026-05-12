import { Centro } from 'src/centros/domain/centro.entity';
import { Area } from 'src/areas/domain/area.entity';
import { SedeEstado } from './sede-estado.enum';

export class Sede {
  id: string;
  nombre: string;
  direccion: string;
  estado: SedeEstado;
  centro: Centro;
  areas?: Area[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Sede>) {
    Object.assign(this, partial);
  }
}
