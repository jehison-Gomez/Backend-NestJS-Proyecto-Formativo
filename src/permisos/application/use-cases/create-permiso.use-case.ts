import { Injectable } from "@nestjs/common";
import { PermisoRepository } from "src/permisos/domain/permiso.repository";
import { Permiso } from "src/permisos/domain/permiso.entity";
import { CreatePermisoDto } from "../dto/create-permiso.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class CreatePermisoUseCase {
    constructor(private readonly repository: PermisoRepository) {}

    async execute(dto: CreatePermisoDto): Promise<Permiso> {
        try {
            const permiso = new Permiso({ ...dto });
            return await this.repository.create(permiso);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}