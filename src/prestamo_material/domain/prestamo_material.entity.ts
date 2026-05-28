import { Prestamo_materialEstado } from './prestamo_material-estado.enum';
import { Prestamo } from 'src/prestamos/domain/prestamo.entity';
import { Materiale } from 'src/materiales/domain/materiale.entity';
import { Devolucione } from 'src/devoluciones/domain/devolucione.entity';

export class Prestamo_material {
  id: string;
  cantidad: number;
  estado: Prestamo_materialEstado;
  prestamo: Prestamo;
  material: Materiale;
  devolucion?: Devolucione;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Prestamo_material>) {
    Object.assign(this, partial);
  }
}
