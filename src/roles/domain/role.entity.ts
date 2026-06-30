import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { RoleEstado } from './role-estado.enum';

export class Role {
  id: string;
  nombre: string;
  descripcion: string;
  nivelAcceso: number;
  estado: RoleEstado;
  usuarios?: Usuario[];
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}
