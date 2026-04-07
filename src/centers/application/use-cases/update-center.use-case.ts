import { Inject, Injectable } from "@nestjs/common";
import { CENTER_REPOSITORY } from "src/centers/domain/center.repository";
import type { CenterRepository } from "src/centers/domain/center.repository";
import { FindOneCenterUseCase } from "./find-one-center.use-case";
import { UpdateCenterDto } from "../dto/update-center.dto";
import { Center } from "src/centers/domain/center.entity";
import { handleDBErrors } from "../handle-db-errors";


@Injectable()
export class UpdateCenterUseCase {
    constructor(
        @Inject(CENTER_REPOSITORY)
        private readonly repo: CenterRepository,
        private readonly findOne: FindOneCenterUseCase,
    ) {}

    async execute(id: string, dto: UpdateCenterDto): Promise<Center> {
        const center = await this.findOne.execute(id);
        center.name = dto.name ?? center.name;
        center.center_code = dto.center_code ?? center.center_code;
        center.address = dto.address ?? center.address;
        center.department_id = dto.department_id ?? center.department_id;

        try {
            return await this.repo.save(center);
        } catch (error) {
            handleDBErrors(error);
        }
        
    }
}