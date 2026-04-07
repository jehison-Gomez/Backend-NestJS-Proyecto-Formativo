import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../domain/usuario.entity';
import { UsuarioRepository } from '../domain/usuario.repository';
import { UsuarioOrmEntity } from './typeorm/usuario.orm-entity';

@Injectable()
export class UsuarioTypeOrmRepository implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repository: Repository<UsuarioOrmEntity>,
  ) {}

  private toDomain(entity: UsuarioOrmEntity): Usuario {
    return new Usuario(
      entity.id,
      entity.nombre,
      entity.apellido,
      entity.correo,
      entity.contrasena,
      entity.estado,
      entity.fichaId,
      entity.rolId,
      entity.asignacionId,
    );
  }

  private toEntity(domain: Usuario): UsuarioOrmEntity {
    const entity = new UsuarioOrmEntity();
    entity.id = domain.id;
    entity.nombre = domain.nombre;
    entity.apellido = domain.apellido;
    entity.correo = domain.correo;
    entity.contrasena = domain.contrasena;
    entity.estado = domain.estado;
    entity.fichaId = domain.fichaId;
    entity.rolId = domain.rolId;
    entity.asignacionId = domain.asignacionId;
    return entity;
  }

  async findAll(): Promise<Usuario[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.toDomain(entity));
  }

  async findById(id: number): Promise<Usuario | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? this.toDomain(entity) : null;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const entity = this.toEntity(usuario);
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }
}
