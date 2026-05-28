import { AprobacioneDecision } from './aprobacione-decision.enum';
import { AprobacioneEstado } from './aprobacione-estado.enum';
import { Prestamo } from 'src/prestamos/domain/prestamo.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

export class Aprobacione {
  id: string;
  decision: AprobacioneDecision;
  observacion: string;
  estado: AprobacioneEstado;
  prestamo: Prestamo;
  usuario: Usuario;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Aprobacione>) {
    Object.assign(this, partial);
  }
}
