import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { RejectPrestamoDto } from '../dto/reject-prestamo.dto';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { CreateNotificacionUseCase } from 'src/notificaciones/application/use-cases/create-notificacion.use-case';
import { NotificacionTipo } from 'src/notificaciones/domain/notificacion-tipo.enum';

@Injectable()
export class RejectPrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly createNotificacion: CreateNotificacionUseCase,
  ) {}

  async execute(id: string, dto: RejectPrestamoDto): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne(id);
    if (!prestamo) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    if (prestamo.estado !== PrestamoEstado.PENDIENTE && prestamo.estado !== PrestamoEstado.MODIFICADO) {
      throw new BadRequestException(
        `Solo se puede rechazar un préstamo en estado PENDIENTE o MODIFICADO. Estado actual: ${prestamo.estado}`,
      );
    }

    const partial: Partial<Prestamo> = {
      estado:              PrestamoEstado.RECHAZADO,
      observacionRevision: dto.observacionRevision,
      fechaRevision:       new Date(),
    };

    if (dto.revisadoPorId) partial.revisadoPor = await this.findOneUsuario.execute(dto.revisadoPorId);

    const updated = await this.prestamoRepository.update(id, partial);

    // Notificar al solicitante
    try {
      if (prestamo.solicitante?.id) {
        await this.createNotificacion.execute({
          destinatarioId: prestamo.solicitante.id,
          tipo:           NotificacionTipo.PRESTAMO_RECHAZADO,
          titulo:         'Tu préstamo fue rechazado',
          mensaje:        `Tu solicitud de préstamo ha sido rechazada.${dto.observacionRevision ? ' Motivo: ' + dto.observacionRevision : ''}`,
          ruta:           '/app/prestamos',
        });
      }
    } catch { /* no interrumpir si falla la notificación */ }

    return updated;
  }
}
