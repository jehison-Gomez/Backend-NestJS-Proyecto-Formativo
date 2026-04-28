import { Injectable } from "@nestjs/common";
import { RolPermisoRepository } from "src/rol_permisos/domain/rol_permiso.repository";
import { RolPermiso } from "src/rol_permisos/domain/rol_permiso.entity";
import { CreateRolPermisoDto } from "../dto/create-rol_permiso.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class CreateRolPermisoUseCase {
    constructor(private readonly repository: RolPermisoRepository) {}

    async execute(dto: CreateRolPermisoDto): Promise<RolPermiso> {
        try {
            const rol_permiso = new RolPermiso({ ...dto });
            return await this.repository.create(rol_permiso);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}