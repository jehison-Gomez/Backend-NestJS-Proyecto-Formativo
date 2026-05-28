import { MovimientoEstado } from './movimiento-estado.enum';
import { MovimientoTipo } from './movimiento-tipo.enum';
import { Prestamo } from 'src/prestamos/domain/prestamo.entity';

export class Movimiento {
  id: string;
  tipo: MovimientoTipo;
  cantidad: number;
  descripcion: string;
  estado: MovimientoEstado;
  prestamo?: Prestamo;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Movimiento>) {
    Object.assign(this, partial);
  }
}
