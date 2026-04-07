import { Inject, Injectable } from "@nestjs/common";
import type { DepartmentRepository } from "src/departments/domain/departamento.repository";
import { DEPARTMENT_REPOSITORY } from "src/departments/domain/departamento.repository";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import { Department } from "src/departments/domain/department.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class CreateDepartamentoUseCase {
    constructor(
        @Inject(DEPARTMENT_REPOSITORY)
        private readonly repo: DepartmentRepository,
    ) {}

    async execute(dto: CreateDepartmentDto): Promise<Department> {
        const department = new Department();
        department.name = dto.name;
        department.region_id = dto.region_id;

        try {
            return await this.repo.save(department);
        } catch (error) {
            handleDBErrors(error);
        }
        
    }
}