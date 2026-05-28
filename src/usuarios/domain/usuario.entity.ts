import { Ficha } from 'src/fichas/domain/ficha.entity';
import { Role } from 'src/roles/domain/role.entity';
import { UsuarioEstado } from './usuario-estado.enum';
import type { Area } from 'src/areas/domain/area.entity';

export class Usuario {
  id: string;
  nombre: string;
  correo: string;
  contrasena: string;
  telefono: string;
  numeroDocumento: string;
  estado: UsuarioEstado;
  fechaRegistro: Date;
  ficha?: Ficha;
  fichasLideradas?: Ficha[];
  areaLiderada?: Area;
  role: Role;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Usuario>) {
    Object.assign(this, partial);
  }
}
