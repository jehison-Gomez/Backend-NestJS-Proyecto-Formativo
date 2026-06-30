import { PrestamoEstado } from './prestamo-estado.enum';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';

export class Prestamo {
  id: string;
  motivo: string;
  observacion?: string;
  fechaRegistro: Date;
  fechaInicio: Date;
  fechaFin: Date;
  fechaDevolucionEsperada?: Date | null;
  estado: PrestamoEstado;
  solicitante: Usuario;
  ficha: Ficha;
  beneficiarios?: Usuario[];
  revisadoPor?: Usuario | null;
  fechaRevision?: Date | null;
  observacionRevision?: string | null;
  fechaEntrega?: Date | null;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Prestamo>) {
    Object.assign(this, partial);
  }
}
