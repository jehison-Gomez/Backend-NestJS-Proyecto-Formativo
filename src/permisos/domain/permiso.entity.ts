export class Permiso {
    id_permiso: string;
    nombre: string;
    descripcion: string;
    modulo: string;
    accion?: string;
    activo?: boolean;

    constructor(partial: Partial<Permiso>) {
        Object.assign(this, partial);
    }
}
