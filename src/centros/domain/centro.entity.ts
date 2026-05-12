import { Municipio } from 'src/municipios/domain/municipio.entity';
import { Sede } from 'src/sedes/domain/sede.entity';
import { CentroEstado } from './centro-estado.enum';

export class Centro {
  id: string;
  nombre: string;
  codigo: string;
  direccion: string;
  estado: CentroEstado;
  municipio: Municipio;
  sedes?: Sede[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Centro>) {
    Object.assign(this, partial);
  }
}
