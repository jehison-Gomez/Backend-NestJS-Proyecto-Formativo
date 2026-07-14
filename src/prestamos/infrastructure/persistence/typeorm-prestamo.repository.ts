import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoOrmEntity } from './prestamo.orm-entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { Ficha } from 'src/fichas/domain/ficha.entity';
import { TenantContext } from 'src/tenant/tenant.context';

@Injectable()
export class TypeOrmPrestamoRepository implements PrestamoRepository {
  constructor(
    @InjectRepository(PrestamoOrmEntity)
    private readonly repo: Repository<PrestamoOrmEntity>,
    private readonly tenantContext: TenantContext,
  ) {}

  private toDomain(orm: PrestamoOrmEntity): Prestamo {
    return new Prestamo({
      id:                    orm.id,
      motivo:                orm.motivo,
      observacion:           orm.observacion,
      fechaRegistro:         orm.fechaRegistro,
      fechaInicio:           orm.fechaInicio,
      fechaFin:              orm.fechaFin,
      fechaDevolucionEsperada: orm.fechaDevolucionEsperada,
      estado:                orm.estado,
      solicitante: orm.solicitante ? new Usuario({
        id:              orm.solicitante.id,
        nombre:          orm.solicitante.nombre,
        correo:          orm.solicitante.correo,
        numeroDocumento: orm.solicitante.numeroDocumento,
        telefono:        orm.solicitante.telefono,
        estado:          orm.solicitante.estado,
      }) : undefined,
      ficha: orm.ficha ? new Ficha({
        id:          orm.ficha.id,
        codigoFicha: orm.ficha.codigoFicha,
        fechaInicio: orm.ficha.fechaInicio,
        fechaFin:    orm.ficha.fechaFin,
        estado:      orm.ficha.estado,
      }) : undefined,
      beneficiarios: (orm.beneficiarios ?? []).map((u) => new Usuario({
        id:              u.id,
        nombre:          u.nombre,
        correo:          u.correo,
        numeroDocumento: u.numeroDocumento,
        telefono:        u.telefono,
        estado:          u.estado,
      })),
      revisadoPor: orm.revisadoPor ? new Usuario({
        id:     orm.revisadoPor.id,
        nombre: orm.revisadoPor.nombre,
      }) : null,
      fechaRevision:       orm.fechaRevision,
      observacionRevision: orm.observacionRevision,
      fechaEntrega:        orm.fechaEntrega,
      creadoEn:            orm.creadoEn,
      actualizadoEn:       orm.actualizadoEn,
    });
  }

  private toOrm(prestamo: Partial<Prestamo>): Partial<PrestamoOrmEntity> {
    return {
      ...(prestamo.motivo                !== undefined && { motivo:                prestamo.motivo }),
      ...(prestamo.observacion           !== undefined && { observacion:           prestamo.observacion }),
      ...(prestamo.fechaInicio           !== undefined && { fechaInicio:           prestamo.fechaInicio }),
      ...(prestamo.fechaFin              !== undefined && { fechaFin:              prestamo.fechaFin }),
      ...(prestamo.fechaDevolucionEsperada !== undefined && { fechaDevolucionEsperada: prestamo.fechaDevolucionEsperada }),
      ...(prestamo.estado                !== undefined && { estado:                prestamo.estado }),
      ...(prestamo.solicitante           !== undefined && { solicitante:           { id: prestamo.solicitante.id } as any }),
      ...(prestamo.ficha                 !== undefined && { ficha:                 { id: prestamo.ficha.id } as any }),
      ...(prestamo.beneficiarios         !== undefined && { beneficiarios:         prestamo.beneficiarios.map((u) => ({ id: u.id }) as any) }),
      ...(prestamo.revisadoPor           !== undefined && { revisadoPor:           prestamo.revisadoPor ? { id: prestamo.revisadoPor.id } as any : null }),
      ...(prestamo.fechaRevision         !== undefined && { fechaRevision:         prestamo.fechaRevision }),
      ...(prestamo.observacionRevision   !== undefined && { observacionRevision:   prestamo.observacionRevision }),
      ...(prestamo.fechaEntrega          !== undefined && { fechaEntrega:          prestamo.fechaEntrega }),
    };
  }

  private readonly RELATIONS = ['solicitante', 'ficha', 'beneficiarios', 'revisadoPor'];

  async create(prestamo: Prestamo): Promise<Prestamo> {
    const ormEntity = this.repo.create(this.toOrm(prestamo));
    const saved = await this.repo.save(ormEntity);
    return (await this.findOne(saved.id))!;
  }

  async findAll(sedeId?: string | null): Promise<Prestamo[]> {
    const centroId = this.tenantContext.getCentroId();
    const query = this.repo.createQueryBuilder('prestamo')
      .leftJoinAndSelect('prestamo.solicitante', 'solicitante')
      .leftJoinAndSelect('prestamo.ficha', 'ficha')
      .leftJoinAndSelect('prestamo.beneficiarios', 'beneficiarios')
      .leftJoinAndSelect('prestamo.revisadoPor', 'revisadoPor')
      .leftJoin('ficha.programa', 'programa')
      .leftJoin('programa.area', 'area')
      .leftJoin('area.sede', 'sede')
      .leftJoin('sede.centro', 'centro');

    if (centroId) {
      query.andWhere('centro.id = :centroId', { centroId });
    }
    if (sedeId !== undefined) {
      query.andWhere(sedeId ? 'sede.id = :sedeId' : '1 = 0', sedeId ? { sedeId } : {});
    }

    const list = await query.getMany();
    return list.map(this.toDomain.bind(this));
  }

  async findOverdue(): Promise<Prestamo[]> {
    const activeStates = ['PENDIENTE', 'APROBADO', 'MODIFICADO', 'ENTREGADO'];
    const list = await this.repo.createQueryBuilder('prestamo')
      .leftJoinAndSelect('prestamo.solicitante', 'solicitante')
      .leftJoinAndSelect('prestamo.ficha',       'ficha')
      .where('prestamo.fechaFin < CURRENT_DATE')
      .andWhere('prestamo.estado IN (:...estados)', { estados: activeStates })
      .getMany();
    return list.map(this.toDomain.bind(this));
  }

  async findByUsuario(usuarioId: string): Promise<Prestamo[]> {
    const list = await this.repo.createQueryBuilder('prestamo')
      .leftJoinAndSelect('prestamo.solicitante',   'solicitante')
      .leftJoinAndSelect('prestamo.ficha',         'ficha')
      .leftJoinAndSelect('prestamo.beneficiarios', 'beneficiarios')
      .leftJoinAndSelect('prestamo.revisadoPor',   'revisadoPor')
      .where('solicitante.id = :usuarioId', { usuarioId })
      .orWhere('beneficiarios.id = :usuarioId', { usuarioId })
      .orderBy('prestamo.creadoEn', 'DESC')
      .getMany();
    return list.map(this.toDomain.bind(this));
  }

  async findByEncargado(userId: string): Promise<Prestamo[]> {
    const rows: Array<{ id: string }> = await this.repo.manager.query(`
      SELECT DISTINCT p.id
      FROM prestamos p
      INNER JOIN prestamo_item pi ON pi.prestamo_id = p.id
      INNER JOIN material_item mi ON mi.id = pi.material_item_id
      INNER JOIN materiales mat ON mat.id = mi.materiale_id
      INNER JOIN ubicacion ub ON ub.id = mat.ubicacion_id
      WHERE ub.encargado_id = $1
    `, [userId]);

    if (!rows.length) return [];

    const ids = rows.map(r => r.id);
    const list = await this.repo.createQueryBuilder('prestamo')
      .leftJoinAndSelect('prestamo.solicitante', 'solicitante')
      .leftJoinAndSelect('prestamo.ficha', 'ficha')
      .leftJoinAndSelect('prestamo.beneficiarios', 'beneficiarios')
      .leftJoinAndSelect('prestamo.revisadoPor', 'revisadoPor')
      .where('prestamo.id IN (:...ids)', { ids })
      .orderBy('prestamo.creadoEn', 'DESC')
      .getMany();

    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Prestamo | null> {
    const found = await this.repo.findOne({ where: { id }, relations: this.RELATIONS });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, prestamo: Partial<Prestamo>): Promise<Prestamo> {
    await this.repo.save({ id, ...this.toOrm(prestamo) });
    return (await this.findOne(id))!;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
