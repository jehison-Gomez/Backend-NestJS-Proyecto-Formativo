import { Injectable, NotFoundException } from "@nestjs/common";
import { ProgramaRepository } from "src/programas/domain/programa.repository";
import { Programa } from "src/programas/domain/programa.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindOneProgramaUseCase {
    constructor(private readonly repository: ProgramaRepository) {}

    async execute(id: string): Promise<Programa> {
        try {
            const programa = await this.repository.findOne(id);

            if (!programa)
                throw new NotFoundException(`Programa #${id} no encontrado`);

            return programa;
        } catch (error) {
            handleDBErrors(error);
        }
    }
}