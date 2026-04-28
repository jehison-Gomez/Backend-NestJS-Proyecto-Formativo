import { Injectable, NotFoundException } from "@nestjs/common";
import { PermisoRepository } from "src/permisos/domain/permiso.repository";
import { Permiso } from "src/permisos/domain/permiso.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindOnePermisoUseCase {
    constructor(private readonly repository: PermisoRepository) {}

    async execute(id: string): Promise<Permiso> {
        try {
            const permiso = await this.repository.findOne(id);

            if (!permiso)
                throw new NotFoundException(`Permiso #${id} no encontrado`);

            return permiso;
        } catch (error) {
            handleDBErrors(error);
        }
    }
}