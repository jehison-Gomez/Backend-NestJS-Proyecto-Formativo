import { Inject, Injectable } from "@nestjs/common";
import type { RegionRepository } from "src/regions/domain/region.repository";
import { REGION_REPOSITORY } from "src/regions/domain/region.repository";
import { CreateRegionDto } from "../dto/create-region.dto";
import { Region } from "src/regions/domain/region.entity";
import { handleDBErrors } from "../handle-db-errors";

@Injectable()
export class CreateRegionUseCase {
    constructor(
        @Inject(REGION_REPOSITORY)
        private readonly repo: RegionRepository,) {}

    async execute(dto: CreateRegionDto): Promise<Region> {
        const region = new Region();
        region.name = dto.name;

        try {
            return await this.repo.save(region);
        } catch (error) {
            handleDBErrors(error);
        }
        
    }
}