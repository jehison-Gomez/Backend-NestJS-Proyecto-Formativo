import { Role } from 'src/roles/domain/role.entity';
import { Permiso } from 'src/permisos/domain/permiso.entity';

export class Rol_permiso {
  id: string;
  role: Role;
  permiso: Permiso;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial?: Partial<Rol_permiso>) {
    if (partial) Object.assign(this, partial);
  }
}
