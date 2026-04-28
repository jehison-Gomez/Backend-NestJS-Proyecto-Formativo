import { Injectable, NotFoundException } from "@nestjs/common";
import { ProgramaRepository } from "src/programas/domain/programa.repository";
import { Programa } from "src/programas/domain/programa.entity";
import { UpdateProgramaDto } from "../dto/update-programa.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class UpdateProgramaUseCase {
    constructor(private readonly repository: ProgramaRepository) {}

    async execute(id: string, dto: UpdateProgramaDto): Promise<Programa> {
        try {
            const exists = await this.repository.findOne(id);

            if (!exists)
                throw new NotFoundException(`Programa #${id} no encontrado`);

            return await this.repository.update(id, dto);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}