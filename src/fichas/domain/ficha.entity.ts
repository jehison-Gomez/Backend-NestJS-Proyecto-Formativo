import { FichaEstado } from "./ficha-estado.enum";

export class Ficha {
    id_ficha: string;
    codigo_ficha: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    estado: FichaEstado;
    id_programa: string;
    id_usuario_lider?: string;

    constructor(partial: Partial<Ficha>) {
        Object.assign(this, partial);
    }
}
