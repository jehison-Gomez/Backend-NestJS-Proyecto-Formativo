import { Inject, Injectable } from "@nestjs/common";
import { SITE_REPOSITORY } from "src/sites/domain/site.repository";
import type { SiteRepository } from "src/sites/domain/site.repository";
import { FindOneSiteUseCase } from "./find-one-site.use-case";


@Injectable()
export class RemoveSiteUseCase {
    constructor(
        @Inject(SITE_REPOSITORY)
        private readonly repo: SiteRepository,
        private readonly findOne: FindOneSiteUseCase,
    ) {}

    async execute(id: string): Promise<void> {
        await this.findOne.execute(id); // Valida que exista
        await this.repo.delete(id);
    }
}