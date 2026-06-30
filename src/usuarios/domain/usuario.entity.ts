import { Ficha } from 'src/fichas/domain/ficha.entity';
import { Role } from 'src/roles/domain/role.entity';
import { Sede } from 'src/sedes/domain/sede.entity';
import { UsuarioEstado } from './usuario-estado.enum';
import { TipoDocumento } from './tipo-documento.enum';
import type { Area } from 'src/areas/domain/area.entity';

export class Usuario {
  id: string;
  nombre: string;
  correo: string;
  contrasena: string;
  telefono: string;
  numeroDocumento: string;
  tipoDocumento?: TipoDocumento | null;
  estado: UsuarioEstado;
  fechaRegistro: Date;
  ficha?: Ficha;
  fichasLideradas?: Ficha[];
  areaLiderada?: Area;
  role: Role;
  sede?: Sede | null;
  creadoEn: Date;
  actualizadoEn: Date;

  constructor(partial: Partial<Usuario>) {
    Object.assign(this, partial);
  }
}
