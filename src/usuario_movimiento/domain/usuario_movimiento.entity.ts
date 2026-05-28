import { Usuario_movimientoEstado } from './usuario_movimiento-estado.enum';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Movimiento } from 'src/movimientos/domain/movimiento.entity';

export class Usuario_movimiento {
  id: string;
  estado: Usuario_movimientoEstado;
  usuario: Usuario;
  movimiento: Movimiento;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Usuario_movimiento>) {
    Object.assign(this, partial);
  }
}
