import { DevolucioneEstado } from './devolucione-estado.enum';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

export class Devolucione {
  id: string;
  fechaDevolucion: Date;
  observacion: string;
  estado: DevolucioneEstado;
  usuario: Usuario;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Devolucione>) {
    Object.assign(this, partial);
  }
}
