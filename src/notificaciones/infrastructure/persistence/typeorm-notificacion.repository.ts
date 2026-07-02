import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificacionRepository } from '../../domain/notificacion.repository';
import { Notificacion } from '../../domain/notificacion.entity';
import { NotificacionOrmEntity } from './notificacion.orm-entity';

@Injectable()
export class TypeOrmNotificacionRepository implements NotificacionRepository {
  constructor(
    @InjectRepository(NotificacionOrmEntity)
    private readonly repo: Repository<NotificacionOrmEntity>,
  ) {}

  private toDomain(orm: NotificacionOrmEntity): Notificacion {
    return new Notificacion({
      id:             orm.id,
      destinatarioId: orm.destinatarioId,
      tipo:           orm.tipo,
      titulo:         orm.titulo,
      mensaje:        orm.mensaje,
      ruta:           orm.ruta,
      leido:          orm.leido,
      creadoEn:       orm.creadoEn,
    });
  }

  async create(notificacion: Notificacion): Promise<Notificacion> {
    const orm = this.repo.create({
      destinatarioId: notificacion.destinatarioId,
      tipo:           notificacion.tipo,
      titulo:         notificacion.titulo,
      mensaje:        notificacion.mensaje,
      ruta:           notificacion.ruta ?? '/app/prestamos',
      leido:          false,
    });
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
  }

  async findByDestinatario(destinatarioId: string): Promise<Notificacion[]> {
    const list = await this.repo.find({
      where: { destinatarioId, leido: false },
      order: { creadoEn: 'DESC' },
    });
    return list.map(this.toDomain.bind(this));
  }

  async marcarLeida(id: string): Promise<void> {
    await this.repo.update(id, { leido: true });
  }

  async marcarTodasLeidas(destinatarioId: string): Promise<void> {
    await this.repo.update({ destinatarioId, leido: false }, { leido: true });
  }
}
