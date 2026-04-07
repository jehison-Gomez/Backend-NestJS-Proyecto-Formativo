export enum UsuarioStatus {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

export class Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  estado: UsuarioStatus;
  fichaId?: number;
  rolId?: number;
  asignacionId?: number;
}
