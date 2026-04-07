import { Inject, Injectable } from "@nestjs/common";
import { Program } from "src/programs/domain/program.entity";
import type { ProgramRepository } from "src/programs/domain/program.repository";
import { PROGRAM_REPOSITORY } from "src/programs/domain/program.repository";

@Injectable()
export class FindAllProgramsUseCase {
    constructor(
        @Inject(PROGRAM_REPOSITORY)
        private readonly repo: ProgramRepository) {}

    async execute(): Promise<Program[]> {
        return await this.repo.findAll();
    }
}