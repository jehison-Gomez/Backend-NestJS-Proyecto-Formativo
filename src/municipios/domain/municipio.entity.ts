import { Departamento } from 'src/departamentos/domain/departamento.entity';
import { MunicipioEstado } from './municipio-estado.enum';
import { Centro } from 'src/centros/domain/centro.entity';

export class Municipio {
  id: string;
  nombre: string;
  codigo: string;
  estado: MunicipioEstado;
  departamento: Departamento;
  centro: Centro;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Municipio>) {
    Object.assign(this, partial);
  }
}
