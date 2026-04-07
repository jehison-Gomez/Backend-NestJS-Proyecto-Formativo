import { Inject, Injectable } from "@nestjs/common";
import type { AreaRepository } from "src/areas/domain/area.repository";
import { AREA_REPOSITORY } from "src/areas/domain/area.repository";
import { FindOneAreaUseCase } from "./find-one-area.use-case";

@Injectable()
export class RemoveAreaUseCase {
    constructor(
        @Inject(AREA_REPOSITORY)
        private readonly repo: AreaRepository,
        private readonly findOne: FindOneAreaUseCase,
    ) {}

    async execute(id: string): Promise<void> {
        await this.findOne.execute(id); // Valida que exista
        await this.repo.delete(id);
    }
}