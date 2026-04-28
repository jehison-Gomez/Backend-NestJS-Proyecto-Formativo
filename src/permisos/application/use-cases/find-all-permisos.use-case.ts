import { Injectable } from "@nestjs/common";
import { PermisoRepository } from "src/permisos/domain/permiso.repository";
import { Permiso } from "src/permisos/domain/permiso.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindAllPermisosUseCase {
    constructor(private readonly repository: PermisoRepository) {}

    async execute(): Promise<Permiso[]> {
        try {
            return await this.repository.findAll();
        } catch (error) {
            handleDBErrors(error);
        }
    }
}