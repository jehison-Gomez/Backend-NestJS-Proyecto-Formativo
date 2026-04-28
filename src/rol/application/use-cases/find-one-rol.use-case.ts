import { Injectable, NotFoundException } from "@nestjs/common";
import { RolRepository } from "src/rol/domain/rol.repository";
import { Rol } from "src/rol/domain/rol.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindOneRolUseCase {
    constructor(private readonly repository: RolRepository) {}

    async execute(id: string): Promise<Rol> {
        try {
            const rol = await this.repository.findOne(id);

            if (!rol)
                throw new NotFoundException(`Rol #${id} no encontrado`);

            return rol;
        } catch (error) {
            handleDBErrors(error);
        }
    }
}