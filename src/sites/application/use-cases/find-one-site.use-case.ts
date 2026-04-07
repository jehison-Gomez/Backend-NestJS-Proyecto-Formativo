import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Site } from "src/sites/domain/site.entity";
import type { SiteRepository } from "src/sites/domain/site.repository";
import { SITE_REPOSITORY } from "src/sites/domain/site.repository";


@Injectable()
export class FindOneSiteUseCase {
    constructor(
        @Inject(SITE_REPOSITORY)
        private readonly repo: SiteRepository) {}

    async execute(id: string): Promise<Site> {
        const site = await this.repo.findById(id);
        if (!site)
            throw new NotFoundException(`Site with id "${id}" not found`);
        return site;
    }
}