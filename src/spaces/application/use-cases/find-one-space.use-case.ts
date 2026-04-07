import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Space } from "src/spaces/domain/space.entity";
import type { SpaceRepository } from "src/spaces/domain/space.repository";
import { SPACE_REPOSITORY } from "src/spaces/domain/space.repository";

@Injectable()
export class FindOneSpaceUseCase {
    constructor(
        @Inject(SPACE_REPOSITORY)
        private readonly repo: SpaceRepository) {}

    async execute(id: string): Promise<Space> {
        const space = await this.repo.findById(id);
        if (!space)
            throw new NotFoundException(`Space with id "${id}" not found`);
        return space;
    }
}