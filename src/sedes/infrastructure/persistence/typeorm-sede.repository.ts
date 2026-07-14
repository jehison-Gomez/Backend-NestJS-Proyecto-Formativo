import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SedeRepository } from '../../domain/sede.repository';
import { Sede } from '../../domain/sede.entity';
import { SedeOrmEntity } from './sede.orm-entity';
import { Centro } from 'src/centros/domain/centro.entity';
import { TenantContext } from 'src/tenant/tenant.context';

@Injectable()
export class TypeOrmSedeRepository implements SedeRepository {
  constructor(
    @InjectRepository(SedeOrmEntity)
    private readonly repo: Repository<SedeOrmEntity>,
    private readonly tenantContext: TenantContext,
  ) {}

  private toDomain(orm: SedeOrmEntity): Sede {
    return new Sede({
      id: orm.id,
      nombre: orm.nombre,
      direccion: orm.direccion,
      estado: orm.estado,
      centro: orm.centro ? new Centro({
        id: orm.centro.id,
        nombre: orm.centro.nombre,
        codigo: orm.centro.codigo,
        direccion: orm.centro.direccion,
        estado: orm.centro.estado,
      }) : undefined,
      creadoEn: orm.creadoEn,
      actualizadoEn: orm.actualizadoEn,
    });
  }

  private toOrm(sede: Partial<Sede>): Partial<SedeOrmEntity> {
    return {
      ...(sede.nombre !== undefined && { nombre: sede.nombre }),
      ...(sede.direccion !== undefined && { direccion: sede.direccion }),
      ...(sede.estado !== undefined && { estado: sede.estado }),
      ...(sede.centro !== undefined && { centro: { id: sede.centro.id } as any }),
    };
  }

  async create(sede: Sede): Promise<Sede> {
    const ormEntity = this.repo.create(this.toOrm(sede));
    const saved = await this.repo.save(ormEntity);
    const result = await this.findOne(saved.id);
    return result!;
  }

  async findAll(): Promise<Sede[]> {
    const centroId = this.tenantContext.getCentroId();
    const query = this.repo.createQueryBuilder('sede')
      .leftJoinAndSelect('sede.centro', 'centro');

    if (centroId) {
      query.where('centro.id = :centroId', { centroId });
    }

    const list = await query.getMany();
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Sede | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['centro'],
    });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, sede: Partial<Sede>): Promise<Sede> {
    await this.repo.update(id, this.toOrm(sede));
    const result = await this.findOne(id);
    return result!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
