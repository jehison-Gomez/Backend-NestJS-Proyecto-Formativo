export class Rol {
    id_rol: string;
    nombre: string;
    descripcion: string;
    nivel_acceso: string;
    activo: string;
    id_usuario: string;

    constructor(partial: Partial<Rol>) {
        Object.assign(this, partial);
    }
}
