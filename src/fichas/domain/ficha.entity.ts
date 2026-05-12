import { Programa } from 'src/programas/domain/programa.entity';
import { FichaEstado } from './ficha-estado.enum';

export class Ficha {
  id: string;
  codigoFicha: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: FichaEstado;
  programa: Programa;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Ficha>) {
    Object.assign(this, partial);
  }
}
