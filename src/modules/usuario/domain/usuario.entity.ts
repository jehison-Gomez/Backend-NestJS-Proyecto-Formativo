import { UsuarioStatus } from './usuario-status.enum';

export class Usuario {
  constructor(
    public readonly id: number,
    public nombre: string,
    public apellido: string,
    public correo: string,
    public contrasena: string,
    public estado: UsuarioStatus,
    public fichaId?: number,
    public rolId?: number,
    public asignacionId?: number,
  ) {}
}
