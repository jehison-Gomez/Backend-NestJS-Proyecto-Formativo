import { FichaEstado } from './ficha-estado.enum';

export class Ficha {
  id: string;
  nombre: string;
  codigo: string;
  estado: FichaEstado;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Ficha>) {
    Object.assign(this, partial);
  }
}
