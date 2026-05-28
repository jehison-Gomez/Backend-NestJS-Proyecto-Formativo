import { Programa } from 'src/programas/domain/programa.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { FichaEstado } from './ficha-estado.enum';
import type { Materiale } from 'src/materiales/domain/materiale.entity';

export class Ficha {
  id: string;
  codigoFicha: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: FichaEstado;
  programa: Programa;
  usuarioLider?: Usuario;
  aprendices?: Usuario[];
  materiales?: Materiale[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Ficha>) {
    Object.assign(this, partial);
  }
}
