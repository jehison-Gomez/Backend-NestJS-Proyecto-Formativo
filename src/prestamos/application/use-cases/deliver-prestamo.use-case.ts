import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { PrestamoItemRepository } from 'src/prestamo_item/domain/prestamo_item.repository';
import { Material_itemRepository } from 'src/material_item/domain/material_item.repository';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';
import { FindByPrestamoPrestamoConsumibleUseCase } from 'src/prestamo_consumible/application/use-cases/find-by-prestamo-prestamo_consumible.use-case';
import { FindOneMaterial_consumibleUseCase } from 'src/material_consumible/application/use-cases/find-one-material_consumible.use-case';
import { UpdateMaterial_consumibleUseCase } from 'src/material_consumible/application/use-cases/update-material_consumible.use-case';
import { CreateNotificacionUseCase } from 'src/notificaciones/application/use-cases/create-notificacion.use-case';
import { NotificacionTipo } from 'src/notificaciones/domain/notificacion-tipo.enum';
import { CreatePrestamoHistorialUseCase } from 'src/prestamo_historial/application/use-cases/create-prestamo_historial.use-case';

@Injectable()
export class DeliverPrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly prestamoItemRepository: PrestamoItemRepository,
    private readonly materialItemRepository: Material_itemRepository,
    private readonly findConsumiblesByPrestamo: FindByPrestamoPrestamoConsumibleUseCase,
    private readonly findOneConsumible: FindOneMaterial_consumibleUseCase,
    private readonly updateConsumible: UpdateMaterial_consumibleUseCase,
    private readonly createNotificacion: CreateNotificacionUseCase,
    private readonly createHistorial: CreatePrestamoHistorialUseCase,
  ) {}

  async execute(id: string): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne(id);
    if (!prestamo) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    if (prestamo.estado !== PrestamoEstado.APROBADO) {
      throw new BadRequestException(
        `Solo se puede entregar un préstamo en estado APROBADO. Estado actual: ${prestamo.estado}`,
      );
    }

    // Marcar cada material_item como PRESTADO
    const items = await this.prestamoItemRepository.findByPrestamo(id);
    for (const pi of items) {
      if (pi.materialItemId) {
        await this.materialItemRepository.update(pi.materialItemId, {
          estado: Material_itemEstado.PRESTADO,
        });
      }
    }

    // Descontar stock de cada consumible (cantidadAprobada tiene prioridad)
    const consumibles = await this.findConsumiblesByPrestamo.execute(id);
    for (const pc of consumibles) {
      if (pc.materialConsumibleId) {
        const consumible = await this.findOneConsumible.execute(pc.materialConsumibleId);
        const cantidad   = Number(pc.cantidadAprobada ?? pc.cantidadSolicitada ?? 0);
        const nuevoStock = Math.max(0, Number(consumible.stockActual) - cantidad);
        await this.updateConsumible.execute(pc.materialConsumibleId, { stockActual: nuevoStock });
      }
    }

    const updated = await this.prestamoRepository.update(id, {
      estado:       PrestamoEstado.ENTREGADO,
      fechaEntrega: new Date(),
    });

    // Notificar al solicitante que su préstamo fue entregado
    try {
      if (prestamo.solicitante?.id) {
        await this.createNotificacion.execute({
          destinatarioId: prestamo.solicitante.id,
          tipo:           NotificacionTipo.PRESTAMO_ENTREGADO,
          titulo:         '¡Tu préstamo fue entregado!',
          mensaje:        `Los materiales de tu préstamo ya están disponibles para retirar. Motivo: ${prestamo.motivo}`,
          ruta:           '/app/prestamos',
        });
      }
    } catch { /* no interrumpir si falla la notificación */ }

    try {
      await this.createHistorial.execute({
        prestamoId:     id,
        estadoAnterior: prestamo.estado,
        estadoNuevo:    PrestamoEstado.ENTREGADO,
        usuarioId:      null,
        observacion:    null,
      });
    } catch { /* no interrumpir si falla el historial */ }

    return updated;
  }
}
