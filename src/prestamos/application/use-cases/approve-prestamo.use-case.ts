import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { ApprovePrestamoDto } from '../dto/approve-prestamo.dto';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';

@Injectable()
export class ApprovePrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly findOneUsuario:     FindOneUsuarioUseCase,
    private readonly notificaciones:     NotificacionesService,
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

    const updated = await this.prestamoRepository.update(id, partial);

    // Notificar al solicitante
    if (prestamo.solicitante?.id) {
      await this.notificaciones.crearParaUsuario(
        prestamo.solicitante.id,
        'Préstamo aprobado',
        `Tu solicitud "${prestamo.motivo}" ha sido aprobada. Puedes pasar a retirar los materiales.`,
        'prestamo_aprobado',
        id,
        '/app/mis-prestamos',
      ).catch(() => {});
    }

    return updated;
  }
}
