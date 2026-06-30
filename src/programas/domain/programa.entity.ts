import { Area } from 'src/areas/domain/area.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';
import { ProgramaEstado } from './programa-estado.enum';
import { ProgramaNivelFormacion } from './programa-nivel-formacion.enum';

export class Programa {
  id: string;
  nombre: string;
  codigo: string;
  nivelFormacion: ProgramaNivelFormacion;
  estado: ProgramaEstado;
  area: Area;
  fichas?: Ficha[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Programa>) {
    Object.assign(this, partial);
  }
}
