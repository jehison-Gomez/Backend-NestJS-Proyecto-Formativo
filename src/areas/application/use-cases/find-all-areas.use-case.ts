import { Inject, Injectable } from "@nestjs/common";
import { Area } from "src/areas/domain/area.entity";
import type { AreaRepository } from "src/areas/domain/area.repository";
import { AREA_REPOSITORY } from "src/areas/domain/area.repository";

@Injectable()
export class FindAllAreasUseCase {
    constructor(
        @Inject(AREA_REPOSITORY)
        private readonly repo: AreaRepository) {}

    async execute(): Promise<Area[]> {
        return await this.repo.findAll();
    }
}