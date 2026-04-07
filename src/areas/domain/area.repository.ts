import { Area } from "./area.entity";

export interface AreaRepository {
    save(area: Area): Promise<Area>;
    findAll(): Promise<Area[]>;
    findById(id: string): Promise<Area | null>;
    delete(id: string): Promise<void>;
}

// Esto es el puerto - le dice a la aplicacion "qué operaciones existen" sin importar cómo se implementan.

// Token de inyección
export const AREA_REPOSITORY = 'AREA_REPOSITORY';