import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CenterRepository } from "src/centers/domain/center.repository";
import { CenterOrmEntity } from "./center.orm-entity";
import { Center } from "src/centers/domain/center.entity";
import { Repository } from "typeorm";


@Injectable()
export class TypeOrmCenterRepository implements CenterRepository {
    
    constructor(
        @InjectRepository(CenterOrmEntity)
        private readonly repo: Repository<CenterOrmEntity>,
    ) {}

    async save(center: Center): Promise<Center> {
        const orm = this.repo.create({ name: center.name, center_code: center.center_code, address: center.address, department_id: center.department_id });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }

    async findAll(): Promise<Center[]> {
        const list = await this.repo.find();
        return list.map(orm => this.toDomain(orm));
    }

    async findById(id: string): Promise<Center | null> {
        const found = await this.repo.findOneBy({ id });
        return found ? this.toDomain(found) : null;
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }

    // Convierte OrmEntity -> dominio
    private toDomain(orm: CenterOrmEntity): Center {
        const center = new Center();
        center.id = orm.id;
        center.name = orm.name;
        center.center_code = orm.center_code;
        center.address = orm.address;
        center.department_id = orm.department_id;
        return center;
    }
}