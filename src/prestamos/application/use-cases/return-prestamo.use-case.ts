import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { PrestamoItemRepository } from 'src/prestamo_item/domain/prestamo_item.repository';
import { Material_itemRepository } from 'src/material_item/domain/material_item.repository';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';
import { CreateNotificacionUseCase } from 'src/notificaciones/application/use-cases/create-notificacion.use-case';
import { NotificacionTipo } from 'src/notificaciones/domain/notificacion-tipo.enum';
import { CreatePrestamoHistorialUseCase } from 'src/prestamo_historial/application/use-cases/create-prestamo_historial.use-case';

@Injectable()
export class ReturnPrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly prestamoItemRepository: PrestamoItemRepository,
    private readonly materialItemRepository: Material_itemRepository,
    private readonly createNotificacion: CreateNotificacionUseCase,
    private readonly createHistorial: CreatePrestamoHistorialUseCase,
  ) {}

  async execute(id: string): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne(id);
    if (!prestamo) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    if (prestamo.estado !== PrestamoEstado.ENTREGADO) {
      throw new BadRequestException(
        `Solo se puede devolver un préstamo en estado ENTREGADO. Estado actual: ${prestamo.estado}`,
      );
    }

    // Restaurar cada material_item a DISPONIBLE
    const items = await this.prestamoItemRepository.findByPrestamo(id);
    for (const pi of items) {
      if (pi.materialItemId) {
        await this.materialItemRepository.update(pi.materialItemId, {
          estado: Material_itemEstado.DISPONIBLE,
        });
      }
    }

    const updated = await this.prestamoRepository.update(id, { estado: PrestamoEstado.DEVUELTO });

    // Notificar al solicitante que la devolución fue registrada
    try {
      if (prestamo.solicitante?.id) {
        await this.createNotificacion.execute({
          destinatarioId: prestamo.solicitante.id,
          tipo:           NotificacionTipo.PRESTAMO_DEVUELTO,
          titulo:         'Devolución registrada',
          mensaje:        `La devolución de tu préstamo ha sido registrada exitosamente. ¡Gracias!`,
          ruta:           '/app/prestamos',
        });
      }
    } catch { /* no interrumpir si falla la notificación */ }

    try {
      await this.createHistorial.execute({
        prestamoId:     id,
        estadoAnterior: prestamo.estado,
        estadoNuevo:    PrestamoEstado.DEVUELTO,
        usuarioId:      null,
        observacion:    null,
      });
    } catch { /* no interrumpir si falla el historial */ }

    return updated;
  }
}
