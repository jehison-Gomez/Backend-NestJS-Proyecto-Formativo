import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Permiso } from 'src/permisos/domain/permiso.entity';

export class UsuarioPermiso {
  id: string;
  usuario: Usuario;
  permiso: Permiso;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<UsuarioPermiso>) {
    Object.assign(this, partial);
  }
}
