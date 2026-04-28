import { Injectable } from "@nestjs/common";
import { RolPermisoRepository } from "src/rol_permisos/domain/rol_permiso.repository";
import { RolPermiso } from "src/rol_permisos/domain/rol_permiso.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindAllRolPermisosUseCase {
    constructor(private readonly repository: RolPermisoRepository) {}

    async execute(): Promise<RolPermiso[]> {
        try {
            return await this.repository.findAll();
        } catch (error) {
            handleDBErrors(error);
        }
    }
}