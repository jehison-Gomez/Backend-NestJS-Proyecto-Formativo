import { Injectable, NotFoundException } from "@nestjs/common";
import { RolPermisoRepository } from "src/rol_permisos/domain/rol_permiso.repository";
import { RolPermiso } from "src/rol_permisos/domain/rol_permiso.entity";
import { UpdateRolPermisoDto } from "../dto/update-rol_permiso.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class UpdateRolPermisoUseCase {
    constructor(private readonly repository: RolPermisoRepository) {}

    async execute(id: string, dto: UpdateRolPermisoDto): Promise<RolPermiso> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`RolPermiso #${id} no encontrado`);

            return await this.repository.update(id, dto);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}