import { ProgramaEstado } from "./programa-estado.enum";

export class Programa {
    id_programa: string;
    nombre: string;
    codigo: string;
    nivel_formacion: string;
    estado: ProgramaEstado;
    id_area: string;

    constructor(partial: Partial<Programa>) {
        Object.assign(this, partial);
    }
}
