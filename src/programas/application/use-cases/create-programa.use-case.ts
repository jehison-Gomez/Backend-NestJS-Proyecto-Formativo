import { Injectable } from "@nestjs/common";
import { ProgramaRepository } from "src/programas/domain/programa.repository";
import { Programa } from "src/programas/domain/programa.entity";
import { CreateProgramaDto } from "../dto/create-programa.dto";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class CreateProgramaUseCase {
    constructor(private readonly repository: ProgramaRepository) {}

    async execute(dto: CreateProgramaDto): Promise<Programa> {
        try {
            const programa = new Programa({ ...dto });
            return await this.repository.create(programa);
        } catch (error) {
            handleDBErrors(error);
        }
    }
}