import { ProgramaEstado } from './programa-estado.enum';

export class Programa {
  id: string;
  nombre: string;
  codigo: string;
  estado: ProgramaEstado;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Programa>) {
    Object.assign(this, partial);
  }
}
