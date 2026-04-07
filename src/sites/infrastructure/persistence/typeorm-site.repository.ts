import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SiteRepository } from "src/sites/domain/site.repository";
import { SiteOrmEntity } from "./site.orm-entity";
import { Repository } from "typeorm";
import { Site } from "src/sites/domain/site.entity";

@Injectable()
export class TypeOrmSiteRepository implements SiteRepository {

    constructor(
        @InjectRepository(SiteOrmEntity)
        private readonly repo: Repository<SiteOrmEntity>,
    ) {}

    async save(site: Site): Promise<Site> {
        const orm = this.repo.create({ name: site.name, address: site.address, center_id: site.center_id });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }

    async findAll(): Promise<Site[]> {
        const list = await this.repo.find();
        return list.map(orm => this.toDomain(orm));
    }

    async findById(id: string): Promise<Site | null> {
        const found = await this.repo.findOneBy({ id });
        return found ? this.toDomain(found) : null;
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }

    // Convierte OrmEntity -> dominio
    private toDomain(orm: SiteOrmEntity): Site {
        const site = new Site();
        site.id = orm.id;
        site.name = orm.name;
        site.address = orm.address;
        site.center_id = orm.center_id;
        return site;
    }
}