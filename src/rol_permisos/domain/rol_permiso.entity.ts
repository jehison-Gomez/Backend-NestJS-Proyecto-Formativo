export class RolPermiso {
    id_rol_permiso: string;
    id_rol: string;
    id_permiso: string;

    constructor(partial: Partial<RolPermiso>) {
        Object.assign(this, partial);
    }
}
