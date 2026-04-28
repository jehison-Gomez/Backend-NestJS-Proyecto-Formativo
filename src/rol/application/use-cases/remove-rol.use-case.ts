import { Injectable, NotFoundException } from "@nestjs/common";
import { RolRepository } from "src/rol/domain/rol.repository";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class RemoveRolUseCase {
    constructor(private readonly repository: RolRepository) {}

    async execute(id: string): Promise<{ message: string }> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`Rol #${id} no encontrado`);

            await this.repository.remove(id);

            return { message: `Rol #${id} eliminado correctamente` };
        } catch (error) {
            handleDBErrors(error);
        }
    }
}