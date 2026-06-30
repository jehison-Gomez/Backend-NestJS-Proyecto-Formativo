import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { RejectPrestamoDto } from '../dto/reject-prestamo.dto';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindByPrestamoPrestamoItemUseCase } from 'src/prestamo_item/application/use-cases/find-by-prestamo-prestamo_item.use-case';
import { Material_itemRepository } from 'src/material_item/domain/material_item.repository';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';

@Injectable()
export class RejectPrestamoUseCase {
  constructor(
    private readonly prestamoRepository:        PrestamoRepository,
    private readonly findOneUsuario:             FindOneUsuarioUseCase,
    private readonly findByPrestamoPrestamoItem: FindByPrestamoPrestamoItemUseCase,
    private readonly materialItemRepository:     Material_itemRepository,
    private readonly notificaciones:             NotificacionesService,
  ) {}

  async execute(id: string, dto: RejectPrestamoDto): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne(id);
    if (!prestamo) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    if (prestamo.estado !== PrestamoEstado.PENDIENTE && prestamo.estado !== PrestamoEstado.MODIFICADO) {
      throw new BadRequestException(
        `Solo se puede rechazar un préstamo en estado PENDIENTE o MODIFICADO. Estado actual: ${prestamo.estado}`,
      );
    }

    const items = await this.findByPrestamoPrestamoItem.execute(id);
    for (const item of items) {
      await this.materialItemRepository.update(item.materialItemId, { estado: Material_itemEstado.DISPONIBLE });
    }

    const partial: Partial<Prestamo> = {
      estado:              PrestamoEstado.RECHAZADO,
      observacionRevision: dto.observacionRevision,
      fechaRevision:       new Date(),
    };

    if (dto.revisadoPorId) partial.revisadoPor = await this.findOneUsuario.execute(dto.revisadoPorId);

    const updated = await this.prestamoRepository.update(id, partial);

    // Notificar al solicitante
    if (prestamo.solicitante?.id) {
      const motivo = dto.observacionRevision ? ` Motivo: ${dto.observacionRevision}` : ''
      await this.notificaciones.crearParaUsuario(
        prestamo.solicitante.id,
        'Préstamo rechazado',
        `Tu solicitud "${prestamo.motivo}" fue rechazada.${motivo}`,
        'prestamo_rechazado',
        id,
        '/app/mis-prestamos',
      ).catch(() => {});
    }

    return updated;
  }
}
