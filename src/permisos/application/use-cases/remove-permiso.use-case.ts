import { Injectable, NotFoundException } from "@nestjs/common";
import { PermisoRepository } from "src/permisos/domain/permiso.repository";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class RemovePermisoUseCase {
    constructor(private readonly repository: PermisoRepository) {}

    async execute(id: string): Promise<{ message: string }> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`Permiso #${id} no encontrado`);

            await this.repository.remove(id);

            return { message: `Permiso #${id} eliminado correctamente` };
        } catch (error) {
            handleDBErrors(error);
        }
    }
}