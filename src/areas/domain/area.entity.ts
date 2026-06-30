import { Sede } from 'src/sedes/domain/sede.entity';
import { Programa } from 'src/programas/domain/programa.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { AreaEstado } from './area-estado.enum';
import type { Ubicacion } from 'src/ubicacion/domain/ubicacion.entity';

export class Area {
  id: string;
  nombre: string;
  descripcion: string;
  estado: AreaEstado;
  sede: Sede;
  programas?: Programa[];
  usuarioLider?: Usuario;
  ubicaciones?: Ubicacion[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Area>) {
    Object.assign(this, partial);
  }
}
