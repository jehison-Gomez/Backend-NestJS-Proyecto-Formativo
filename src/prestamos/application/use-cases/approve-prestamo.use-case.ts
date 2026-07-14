import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { ApprovePrestamoDto } from '../dto/approve-prestamo.dto';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { CreateNotificacionUseCase } from 'src/notificaciones/application/use-cases/create-notificacion.use-case';
import { NotificacionTipo } from 'src/notificaciones/domain/notificacion-tipo.enum';
import { CreatePrestamoHistorialUseCase } from 'src/prestamo_historial/application/use-cases/create-prestamo_historial.use-case';
import { UpdatePrestamoConsumibleUseCase } from 'src/prestamo_consumible/application/use-cases/update-prestamo_consumible.use-case';

@Injectable()
export class ApprovePrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly createNotificacion: CreateNotificacionUseCase,
    private readonly createHistorial: CreatePrestamoHistorialUseCase,
    private readonly updateConsumible: UpdatePrestamoConsumibleUseCase,
  ) {}

  async execute(id: string, dto: ApprovePrestamoDto): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne(id);
    if (!prestamo) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    if (prestamo.estado !== PrestamoEstado.PENDIENTE && prestamo.estado !== PrestamoEstado.MODIFICADO) {
      throw new BadRequestException(
        `Solo se puede aprobar un préstamo en estado PENDIENTE o MODIFICADO. Estado actual: ${prestamo.estado}`,
      );
    }

    const partial: Partial<Prestamo> = {
      estado:        PrestamoEstado.APROBADO,
      fechaRevision: new Date(),
    };

    if (dto.observacionRevision) partial.observacionRevision = dto.observacionRevision;
    if (dto.revisadoPorId) partial.revisadoPor = await this.findOneUsuario.execute(dto.revisadoPorId);

    // Actualizar cantidades aprobadas por consumible (si el admin las ajustó)
    if (dto.cantidadesAprobadas?.length) {
      for (const ca of dto.cantidadesAprobadas) {
        try {
          await this.updateConsumible.execute(ca.prestamoConsumibleId, {
            cantidadAprobada: ca.cantidadAprobada,
          });
        } catch { /* no interrumpir si falla un consumible */ }
      }
    }

    const updated = await this.prestamoRepository.update(id, partial);

    // Notificar al solicitante
    try {
      if (prestamo.solicitante?.id) {
        await this.createNotificacion.execute({
          destinatarioId: prestamo.solicitante.id,
          tipo:           NotificacionTipo.PRESTAMO_APROBADO,
          titulo:         '¡Tu préstamo fue aprobado!',
          mensaje:        `Tu solicitud de préstamo ha sido aprobada.${dto.observacionRevision ? ' Observación: ' + dto.observacionRevision : ''}`,
          ruta:           '/app/prestamos',
        });
      }
    } catch { /* no interrumpir si falla la notificación */ }

    try {
      await this.createHistorial.execute({
        prestamoId:     id,
        estadoAnterior: prestamo.estado,
        estadoNuevo:    PrestamoEstado.APROBADO,
        usuarioId:      dto.revisadoPorId ?? null,
        observacion:    dto.observacionRevision ?? null,
      });
    } catch { /* no interrumpir si falla el historial */ }

    return updated;
  }
}
