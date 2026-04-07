import { Inject, Injectable } from "@nestjs/common";
import { Department } from "src/departments/domain/department.entity";
import type { DepartmentRepository } from "src/departments/domain/departamento.repository";
import { DEPARTMENT_REPOSITORY } from "src/departments/domain/departamento.repository";

@Injectable()
export class FindAllDepartmentosUseCase {
    constructor(
        @Inject(DEPARTMENT_REPOSITORY)
        private readonly repo: DepartmentRepository) {}

    async execute(): Promise<Department[]> {
        return await this.repo.findAll();
    }
}