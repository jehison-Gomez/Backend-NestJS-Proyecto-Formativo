import { Injectable, NotFoundException } from "@nestjs/common";
import { RolPermisoRepository } from "src/rol_permisos/domain/rol_permiso.repository";
import { RolPermiso } from "src/rol_permisos/domain/rol_permiso.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindOneRolPermisoUseCase {
    constructor(private readonly repository: RolPermisoRepository) {}

    async execute(id: string): Promise<RolPermiso> {
        try {
            const rol_permiso = await this.repository.findOne(id);

            if (!rol_permiso)
                throw new NotFoundException(`RolPermiso #${id} no encontrado`);

            return rol_permiso;
        } catch (error) {
            handleDBErrors(error);
        }
    }
}