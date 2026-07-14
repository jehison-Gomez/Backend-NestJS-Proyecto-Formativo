import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoItemRepository } from '../../domain/prestamo_item.repository';
import { CreatePrestamoItemDto } from '../dto/create-prestamo_item.dto';
import { PrestamoItem } from '../../domain/prestamo_item.entity';
import { handleDbErrors } from '../handle-db-errors';
import { Material_itemRepository } from 'src/material_item/domain/material_item.repository';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';
import { UbicacionRepository } from 'src/ubicacion/domain/ubicacion.repository';
import { CreateNotificacionUseCase } from 'src/notificaciones/application/use-cases/create-notificacion.use-case';
import { NotificacionTipo } from 'src/notificaciones/domain/notificacion-tipo.enum';

@Injectable()
export class CreatePrestamoItemUseCase {
  constructor(
    private readonly prestamoItemRepository: PrestamoItemRepository,
    private readonly materialItemRepository: Material_itemRepository,
    private readonly ubicacionRepository: UbicacionRepository,
    private readonly createNotificacion: CreateNotificacionUseCase,
  ) {}

  async execute(dto: CreatePrestamoItemDto): Promise<PrestamoItem> {
    const item = await this.materialItemRepository.findOne(dto.materialItemId);
    if (!item) throw new NotFoundException(`Material item #${dto.materialItemId} no encontrado`);

    if (item.estado !== Material_itemEstado.DISPONIBLE) {
      throw new BadRequestException(
        `El material "${item.codigoSena}" no está disponible para préstamo. Estado actual: ${item.estado}`,
      );
    }

    let prestamoItem: PrestamoItem;
    try {
      prestamoItem = new PrestamoItem({
        prestamoId:           dto.prestamoId,
        materialItemId:       dto.materialItemId,
        incluidoEnAprobacion: dto.incluidoEnAprobacion ?? true,
        observacion:          dto.observacion,
        estado:               dto.estado,
      });
      prestamoItem = await this.prestamoItemRepository.create(prestamoItem);
    } catch (error) {
      handleDbErrors(error);
    }

    // Notificar al encargado de la bodega donde está guardado el material
    try {
      const ubicacion = await this.ubicacionRepository.findByMaterialItemId(dto.materialItemId);
      if (ubicacion?.encargado?.id) {
        await this.createNotificacion.execute({
          destinatarioId: ubicacion.encargado.id,
          tipo:    NotificacionTipo.PRESTAMO_NUEVO,
          titulo:  'Nueva solicitud en tu bodega',
          mensaje: `Se solicitó el material "${item.codigoSena ?? item.id}" de la bodega "${ubicacion.nombre}".`,
          ruta:    '/app/mi-bodega',
        });
      }
    } catch {
      // La notificación no debe bloquear la creación del préstamo
    }

    return prestamoItem!;
  }
}
