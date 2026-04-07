// infrastructure/persistence/typeorm-program.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramRepository } from '../../domain/program.repository';
import { Program } from '../../domain/program.entity';
import { ProgramOrmEntity } from './program.orm-entity';

@Injectable()
export class TypeOrmProgramRepository implements ProgramRepository {

  constructor(
    @InjectRepository(ProgramOrmEntity)
    private readonly repo: Repository<ProgramOrmEntity>,
  ) {}

  async save(program: Program): Promise<Program> {
    const orm = this.repo.create({ name: program.name, description: program.description, area_id: program.area_id });
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Program[]> {
    const list = await this.repo.find();
    return list.map(orm => this.toDomain(orm));
  }

  async findById(id: string): Promise<Program | null> {
    const found = await this.repo.findOneBy({ id });
    return found ? this.toDomain(found) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  // convierte OrmEntity → dominio
  private toDomain(orm: ProgramOrmEntity): Program {
    const program = new Program();
    program.id = orm.id;
    program.name = orm.name;
    program.description = orm.description;
    program.area_id = orm.area_id;
    return program;
  }
}