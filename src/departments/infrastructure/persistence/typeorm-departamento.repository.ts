import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DepartmentRepository } from "src/departments/domain/departamento.repository";
import { DepartmentOrmEntity } from "./departamento.orm-entity";
import { Repository } from "typeorm";
import { Department } from "src/departments/domain/department.entity";

@Injectable()
export class TypeOrmDepartmentRepository implements DepartmentRepository {
    
    constructor(
        @InjectRepository(DepartmentOrmEntity)
        private readonly repo: Repository<DepartmentOrmEntity>,
    ) {}

    async save(department: Department): Promise<Department> {
        const orm = this.repo.create({ name: department.name });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }

    async findAll(): Promise<Department[]> {
        const list = await this.repo.find();
        return list.map(orm => this.toDomain(orm));
    }

    async findById(id: string): Promise<Department | null> {
        const found = await this.repo.findOneBy({ id });
        return found ? this.toDomain(found) : null;
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }

    // Convierte OrmEntity -> dominio
    private toDomain(orm: DepartmentOrmEntity): Department {
        const department = new Department();
        department.id = orm.id;
        department.name = orm.name;
        return department;
    }
}