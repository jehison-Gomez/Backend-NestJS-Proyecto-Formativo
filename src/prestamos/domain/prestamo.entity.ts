import { PrestamoEstado } from './prestamo-estado.enum';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';

export class Prestamo {
  id: string;
  observacion: string;
  fechaRegistro: Date;
  fechaInicio: Date;
  fechaFin: Date;
  estado: PrestamoEstado;
  usuario: Usuario;
  ficha: Ficha;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Prestamo>) {
    Object.assign(this, partial);
  }
}
