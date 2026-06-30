import { Municipio } from 'src/municipios/domain/municipio.entity';
import { DepartamentoEstado } from './departamento-estado.enum';

export class Departamento {
  id: string;
  nombre: string;
  codigo: string;
  estado: DepartamentoEstado;
  municipios: Municipio[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Departamento>) {
    Object.assign(this, partial);
  }
}
