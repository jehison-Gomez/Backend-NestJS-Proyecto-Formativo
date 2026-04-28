import { Injectable, NotFoundException } from "@nestjs/common";
import { PermisoRepository } from "src/permisos/domain/permiso.repository";
import { Permiso } from "src/permisos/domain/permiso.entity";
import { UpdatePermisoDto } from "../dto/update-permiso.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class UpdatePermisoUseCase {
    constructor(private readonly repository: PermisoRepository) {}

    async execute(id: string, dto: UpdatePermisoDto): Promise<Permiso> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`Permiso #${id} no encontrado`);

            return await this.repository.update(id, dto);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}