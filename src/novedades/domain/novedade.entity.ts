import { NovedadeEstado } from './novedade-estado.enum';
import { NovedadeTipo } from './novedade-tipo.enum';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

export class Novedade {
  id: string;
  descripcion: string;
  tipo: NovedadeTipo;
  estado: NovedadeEstado;
  reportadoPor?: Usuario;
  devolucionItemId?: string | null;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Novedade>) {
    Object.assign(this, partial);
  }
}
