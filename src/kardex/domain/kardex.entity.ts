import { KardexEstado } from './kardex-estado.enum';
import { Ficha } from 'src/fichas/domain/ficha.entity';
import { Prestamo } from 'src/prestamos/domain/prestamo.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Materiale } from 'src/materiales/domain/materiale.entity';
import { Ubicacion } from 'src/ubicacion/domain/ubicacion.entity';
import { Movimiento } from 'src/movimientos/domain/movimiento.entity';

export class Kardex {
  id: string;
  cantidad: number;
  cantidadAnterior: number;
  cantidadActual: number;
  estado: KardexEstado;
  ficha: Ficha;
  prestamo: Prestamo;
  usuario: Usuario;
  material: Materiale;
  ubicacion: Ubicacion;
  movimiento: Movimiento;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Kardex>) {
    Object.assign(this, partial);
  }
}
