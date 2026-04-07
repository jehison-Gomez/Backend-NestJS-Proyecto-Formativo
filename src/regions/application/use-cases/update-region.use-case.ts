import { Inject, Injectable } from "@nestjs/common";
import type { RegionRepository } from "src/regions/domain/region.repository";
import { FindOneRegionUseCase } from "./find-one-region.use-case";
import { UpdateRegionDto } from "../dto/update-region.dto";
import { Region } from "src/regions/domain/region.entity";
import { handleDBErrors } from "../handle-db-errors";
import { REGION_REPOSITORY } from "src/regions/domain/region.repository";

@Injectable()
export class UpdateRegionUseCase {
    constructor(
        @Inject(REGION_REPOSITORY)
        private readonly repo: RegionRepository,
        private readonly findOne: FindOneRegionUseCase,
    ) {}

    async execute(id: string, dto: UpdateRegionDto): Promise<Region> {
        const region = await this.findOne.execute(id);
        region.name = dto.name ?? region.name;

        try {
            return await this.repo.save(region);
        } catch (error) {
            handleDBErrors(error);
        }
        
    }
}