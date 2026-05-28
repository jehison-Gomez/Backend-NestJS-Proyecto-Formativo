import { NovedadeEstado } from './novedade-estado.enum';
import { NovedadeTipo } from './novedade-tipo.enum';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Devolucione } from 'src/devoluciones/domain/devolucione.entity';

export class Novedade {
  id: string;
  descripcion: string;
  tipo: NovedadeTipo;
  estado: NovedadeEstado;
  usuario: Usuario;
  devolucion: Devolucione;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Novedade>) {
    Object.assign(this, partial);
  }
}
