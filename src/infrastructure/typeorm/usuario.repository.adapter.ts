import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioOrmEntity } from './usuario.orm-entity';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';

@Injectable()
export class UsuarioRepositoryAdapter implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuarioRepo: Repository<UsuarioOrmEntity>,
  ) {}

  async findById(id: number): Promise<UsuarioOrmEntity | null> {
    return this.usuarioRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<UsuarioOrmEntity[]> {
    return this.usuarioRepo.find();
  }

  async create(usuario: Partial<UsuarioOrmEntity>): Promise<UsuarioOrmEntity> {
    const nuevo = this.usuarioRepo.create(usuario);
    return this.usuarioRepo.save(nuevo);
  }

  async update(id: number, usuario: Partial<UsuarioOrmEntity>): Promise<UsuarioOrmEntity | null> {
    await this.usuarioRepo.update(id, usuario);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.usuarioRepo.delete(id);
  }
}
