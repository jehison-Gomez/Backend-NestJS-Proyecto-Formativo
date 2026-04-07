import { Inject, Injectable } from "@nestjs/common";
import { CENTER_REPOSITORY } from "src/centers/domain/center.repository";
import type { CenterRepository } from "src/centers/domain/center.repository";
import { Center } from "src/centers/domain/center.entity";

@Injectable()
export class FindAllCentersUseCase {
    constructor(
        @Inject(CENTER_REPOSITORY)
        private readonly repo: CenterRepository) {}

    async execute(): Promise<Center[]> {
        return await this.repo.findAll();
    }
}