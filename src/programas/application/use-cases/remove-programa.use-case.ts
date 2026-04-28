import { Injectable, NotFoundException } from "@nestjs/common";
import { ProgramaRepository } from "src/programas/domain/programa.repository";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class RemoveProgramaUseCase {
    constructor(private readonly repository: ProgramaRepository) {}

    async execute(id: string): Promise<{ message: string }> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`Programa #${id} no encontrado`);

            await this.repository.remove(id);

            return { message: `Programa #${id} eliminado correctamente` };
        } catch (error) {
            handleDBErrors(error);
        }
    }
}