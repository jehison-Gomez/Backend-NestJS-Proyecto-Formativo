import { Injectable } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { CreatePrestamoDto } from '../dto/create-prestamo.dto';
import { Prestamo } from '../../domain/prestamo.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { FichaRepository } from 'src/fichas/domain/ficha.repository';
import { UsuarioRepository } from 'src/usuarios/domain/usuario.repository';
import { CreateNotificacionUseCase } from 'src/notificaciones/application/use-cases/create-notificacion.use-case';
import { NotificacionTipo } from 'src/notificaciones/domain/notificacion-tipo.enum';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { CreatePrestamoHistorialUseCase } from 'src/prestamo_historial/application/use-cases/create-prestamo_historial.use-case';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';

@Injectable()
export class CreatePrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOneFicha: FindOneFichaUseCase,
    private readonly fichaRepository: FichaRepository,
    private readonly usuarioRepository: UsuarioRepository,
    private readonly createNotificacion: CreateNotificacionUseCase,
    private readonly createHistorial: CreatePrestamoHistorialUseCase,
  ) {}

  async execute(dto: CreatePrestamoDto): Promise<Prestamo> {
    const solicitante = await this.findOneUsuario.execute(dto.solicitanteId);
    const ficha       = await this.findOneFicha.execute(dto.fichaId);

    const beneficiarios: Usuario[] = [];
    if (dto.beneficiariosIds?.length) {
      for (const uid of dto.beneficiariosIds) {
        beneficiarios.push(await this.findOneUsuario.execute(uid));
      }
    }

    let prestamo: Prestamo;
    try {
      prestamo = await this.prestamoRepository.create(new Prestamo({
        motivo:                  dto.motivo,
        observacion:             dto.observacion,
        fechaInicio:             new Date(dto.fechaInicio),
        fechaFin:                new Date(dto.fechaFin),
        fechaDevolucionEsperada: dto.fechaDevolucionEsperada ? new Date(dto.fechaDevolucionEsperada) : null,
        estado:                  dto.estado,
        solicitante,
        ficha,
        beneficiarios,
      }));
    } catch (error) {
      handleDbErrors(error);
    }

    // Registrar entrada inicial en el historial
    try {
      await this.createHistorial.execute({
        prestamoId:     prestamo!.id,
        estadoAnterior: null,
        estadoNuevo:    PrestamoEstado.PENDIENTE,
        usuarioId:      dto.solicitanteId ?? null,
        observacion:    'Préstamo creado',
      });
    } catch { /* no interrumpir */ }

    // Notificar al admin de la sede del material solicitado
    try {
      const sedeId = await this.fichaRepository.findSedeIdByFichaId(dto.fichaId);
      if (sedeId) {
        const admins = await this.usuarioRepository.findAdminsBySedeId(sedeId);
        for (const admin of admins) {
          await this.createNotificacion.execute({
            destinatarioId: admin.id,
            tipo:           NotificacionTipo.PRESTAMO_NUEVO,
            titulo:         'Nueva solicitud de préstamo',
            mensaje:        `${solicitante.nombre} ha solicitado un préstamo. Motivo: ${dto.motivo}`,
            ruta:           '/app/prestamos',
          });
        }
      }
    } catch { /* no interrumpir si falla la notificación */ }

    return prestamo!;
  }
}
