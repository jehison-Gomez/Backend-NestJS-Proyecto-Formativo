import { Injectable, NotFoundException } from "@nestjs/common";
import { RolPermisoRepository } from "src/rol_permisos/domain/rol_permiso.repository";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class RemoveRolPermisoUseCase {
    constructor(private readonly repository: RolPermisoRepository) {}

    async execute(id: string): Promise<{ message: string }> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`RolPermiso #${id} no encontrado`);

            await this.repository.remove(id);

            return { message: `RolPermiso #${id} eliminado correctamente` };
        } catch (error) {
            handleDBErrors(error);
        }
    }
}