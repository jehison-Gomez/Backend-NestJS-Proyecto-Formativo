import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { DepartmentRepository } from "src/departments/domain/departamento.repository";
import { Department } from "src/departments/domain/department.entity";
import { DEPARTMENT_REPOSITORY } from "src/departments/domain/departamento.repository";
@Injectable()
export class FindOneDepartamentoUseCase {
    constructor(
        @Inject(DEPARTMENT_REPOSITORY)
        private readonly repo: DepartmentRepository) {}

    async execute(id: string): Promise<Department> {
        const department = await this.repo.findById(id);
        if (!department)
            throw new NotFoundException(`Department with id "${id}" not found`);
        return department;
    }
}