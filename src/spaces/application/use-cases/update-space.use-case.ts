import { Inject, Injectable } from "@nestjs/common";
import type { SpaceRepository } from "src/spaces/domain/space.repository";
import { FindOneSpaceUseCase } from "./find-one-space.use-case";
import { UpdateSpaceDto } from "../dto/update-space.dto";
import { Space } from "src/spaces/domain/space.entity";
import { handleDBErrors } from "../handle-db-errors";
import { SPACE_REPOSITORY } from "src/spaces/domain/space.repository";

@Injectable()
export class UpdateSpaceUseCase {
    constructor(
        @Inject(SPACE_REPOSITORY)
        private readonly repo: SpaceRepository,
        private readonly findOne: FindOneSpaceUseCase,
    ) {}

    async execute(id: string, dto: UpdateSpaceDto): Promise<Space> {
        const space = await this.findOne.execute(id);
        space.name = dto.name ?? space.name;
        space.type = dto.type ?? space.type;
        space.area_id = dto.area_id ?? space.area_id;
        try {
            return await this.repo.save(space);
        } catch (error) {
            handleDBErrors(error);
        }
        
    }
}