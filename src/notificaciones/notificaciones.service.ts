import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NotificacionOrmEntity } from './notificacion.orm-entity';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(NotificacionOrmEntity)
    private readonly repo: Repository<NotificacionOrmEntity>,
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuarioRepo: Repository<UsuarioOrmEntity>,
  ) {}

  // Crea una notificación para todos los administradores e instructores encargados
  async crearParaGestores(
    titulo:     string,
    mensaje:    string,
    tipo:       string,
    prestamoId: string,
    ruta:       string,
  ): Promise<void> {
    const gestores = await this.usuarioRepo.find({
      where: { role: { nombre: In(['administrador', 'instructor_encargado']) } },
      relations: ['role'],
    });

    const notificaciones = gestores.map(u =>
      this.repo.create({
        titulo,
        mensaje,
        tipo,
        prestamoId,
        ruta,
        leida:       false,
        destinatario: { id: u.id } as any,
      }),
    );

    if (notificaciones.length > 0) {
      await this.repo.save(notificaciones);
    }
  }

  // Crea una notificación para un usuario específico
  async crearParaUsuario(
    destinatarioId: string,
    titulo:         string,
    mensaje:        string,
    tipo:           string,
    prestamoId:     string | null,
    ruta:           string,
  ): Promise<void> {
    await this.repo.save(
      this.repo.create({
        titulo,
        mensaje,
        tipo,
        prestamoId: prestamoId ?? null,
        ruta,
        leida:      false,
        destinatario: { id: destinatarioId } as any,
      }),
    );
  }

  // Retorna las notificaciones no leídas de un usuario
  async getMisNotificaciones(destinatarioId: string): Promise<NotificacionOrmEntity[]> {
    return this.repo.find({
      where: { destinatario: { id: destinatarioId }, leida: false },
      order: { creadoEn: 'DESC' },
      take:  50,
    });
  }

  async marcarLeida(id: string): Promise<void> {
    await this.repo.update(id, { leida: true });
  }

  async marcarTodasLeidas(destinatarioId: string): Promise<void> {
    await this.repo.update(
      { destinatario: { id: destinatarioId }, leida: false },
      { leida: true },
    );
  }
}
