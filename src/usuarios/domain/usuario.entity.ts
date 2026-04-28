import { UsuarioEstado } from "./usuario-estado.enum";

export class Usuario {
    id_usuario: string;
    nombre: string;
    correo: string;
    contrasena: string;
    telefono: string;
    documento: string;
    estado: UsuarioEstado;
    fecha_registro: Date;
    ultimo_acceso: Date;
    id_ficha: string;

    constructor(partial: Partial<Usuario>) {
        Object.assign(this, partial);
    }
}
