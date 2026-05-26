import { Programa } from 'src/programas/domain/programa.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { FichaEstado } from './ficha-estado.enum';

export class Ficha {
  id: string;
  codigoFicha: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: FichaEstado;
  programa: Programa;
  usuarioLider?: Usuario;
  aprendices?: Usuario[];
  materiales?: import('src/materiales/domain/materiale.entity').Materiale[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Ficha>) {
    Object.assign(this, partial);
  }
}
