import { Injectable, NotFoundException } from "@nestjs/common";
import { FichaRepository } from "src/fichas/domain/ficha.repository";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class RemoveFichaUseCase {
    constructor(private readonly repository: FichaRepository) {}

    async execute(id: string): Promise<{ message: string }> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`Ficha #${id} no encontrado`);

            await this.repository.remove(id);

            return { message: `Ficha #${id} eliminado correctamente` };
        } catch (error) {
            handleDBErrors(error);
        }
    }
}