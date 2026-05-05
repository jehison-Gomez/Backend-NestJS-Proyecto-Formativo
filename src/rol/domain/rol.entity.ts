export class Rol {
    id_rol: string;
    nombre: string;
    descripcion: string;
    nivel_acceso: number;
    activo: boolean;

    constructor(partial: Partial<Rol>) {
        Object.assign(this, partial);
    }
}
