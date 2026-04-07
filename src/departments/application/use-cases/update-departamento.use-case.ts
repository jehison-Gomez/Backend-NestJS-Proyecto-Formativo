import { Inject, Injectable } from "@nestjs/common";
import type { DepartmentRepository } from "src/departments/domain/departamento.repository";
import { FindOneDepartamentoUseCase } from "./find-one-departamento.use-case";
import { UpdateDepartmentDto } from "../dto/update-department.dto";
import { Department } from "src/departments/domain/department.entity";
import { handleDBErrors } from "../handle-db-errors";
import { DEPARTMENT_REPOSITORY } from "src/departments/domain/departamento.repository";

@Injectable()
export class UpdateDepartamentoUseCase {
    constructor(
        @Inject(DEPARTMENT_REPOSITORY)
        private readonly repo: DepartmentRepository,

        private readonly findOne: FindOneDepartamentoUseCase,
    ) {}

    async execute(id: string, dto: UpdateDepartmentDto): Promise<Department> {
        const department = await this.findOne.execute(id);
        department.name = dto.name ?? department.name;
        department.region_id = dto.region_id ?? department.region_id;

        try {
            return await this.repo.save(department);
        } catch (error) {
            handleDBErrors(error);
        }
        
    }
}