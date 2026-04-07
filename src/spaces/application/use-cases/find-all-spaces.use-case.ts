import { Inject, Injectable } from "@nestjs/common";
import { Space } from "src/spaces/domain/space.entity";
import type { SpaceRepository } from "src/spaces/domain/space.repository";
import { SPACE_REPOSITORY } from "src/spaces/domain/space.repository";

@Injectable()
export class FindAllSpacesUseCase {
    constructor(
        @Inject(SPACE_REPOSITORY)
        private readonly repo: SpaceRepository) {}

    async execute(): Promise<Space[]> {
        return await this.repo.findAll();
    }
}