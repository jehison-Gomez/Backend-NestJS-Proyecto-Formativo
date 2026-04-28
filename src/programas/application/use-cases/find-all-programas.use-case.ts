import { Injectable } from "@nestjs/common";
import { ProgramaRepository } from "src/programas/domain/programa.repository";
import { Programa } from "src/programas/domain/programa.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class FindAllProgramasUseCase {
    constructor(private readonly repository: ProgramaRepository) {}

    async execute(): Promise<Programa[]> {
        try {
            return await this.repository.findAll();
        } catch (error) {
            handleDBErrors(error);
        }
    }
}