import { Inject, Injectable } from "@nestjs/common";
import type { DepartmentRepository } from "src/departments/domain/departamento.repository";
import { DEPARTMENT_REPOSITORY } from "src/departments/domain/departamento.repository";
import { FindOneDepartamentoUseCase } from "./find-one-departamento.use-case";

@Injectable()
export class RemoveDepartamentoUseCase {
    constructor(
        @Inject(DEPARTMENT_REPOSITORY)
        private readonly repo: DepartmentRepository,
        private readonly findOne: FindOneDepartamentoUseCase,
    ) {}

    async execute(id: string): Promise<void> {
        await this.findOne.execute(id); // Valida que exista
        await this.repo.delete(id);
    }
}