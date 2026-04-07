import { Inject, Injectable } from "@nestjs/common";
import type { AreaRepository } from "src/areas/domain/area.repository";
import { AREA_REPOSITORY } from "src/areas/domain/area.repository";
import { CreateAreaDto } from "../dto/create-area.dto";
import { Area } from "src/areas/domain/area.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class CreateAreaUseCase {
    constructor(
        @Inject(AREA_REPOSITORY)
        private readonly repo: AreaRepository,) {}

    async execute(dto: CreateAreaDto): Promise<Area> {
        const area = new Area();
        area.name = dto.name;

        try {
            return await this.repo.save(area);
        } catch (error) {
            handleDBErrors(error);
        }
        
    }
}