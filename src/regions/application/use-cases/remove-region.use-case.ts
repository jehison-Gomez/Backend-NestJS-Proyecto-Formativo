import { Inject, Injectable } from "@nestjs/common";
import type { RegionRepository } from "src/regions/domain/region.repository";
import { REGION_REPOSITORY } from "src/regions/domain/region.repository";
import { FindOneRegionUseCase } from "./find-one-region.use-case";

@Injectable()
export class RemoveRegionUseCase {
    constructor(
        @Inject(REGION_REPOSITORY)
        private readonly repo: RegionRepository,
        private readonly findOne: FindOneRegionUseCase,
    ) {}

    async execute(id: string): Promise<void> {
        await this.findOne.execute(id); // Valida que exista
        await this.repo.delete(id);
    }
}