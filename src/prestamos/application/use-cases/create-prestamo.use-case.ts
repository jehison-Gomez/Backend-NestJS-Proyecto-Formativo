import { Injectable } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { CreatePrestamoDto } from '../dto/create-prestamo.dto';
import { Prestamo } from '../../domain/prestamo.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { Usuario } from 'src/usuarios/domain/usuario.entity';
import { NotificacionesService } from 'src/notificaciones/notificaciones.service';

@Injectable()
export class CreatePrestamoUseCase {
  constructor(
    private readonly prestamoRepository:   PrestamoRepository,
    private readonly findOneUsuario:        FindOneUsuarioUseCase,
    private readonly findOneFicha:          FindOneFichaUseCase,
    private readonly notificaciones:        NotificacionesService,
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

    try {
      const prestamo = new Prestamo({
        motivo:                  dto.motivo,
        observacion:             dto.observacion,
        fechaInicio:             new Date(dto.fechaInicio),
        fechaFin:                new Date(dto.fechaFin),
        fechaDevolucionEsperada: dto.fechaDevolucionEsperada ? new Date(dto.fechaDevolucionEsperada) : null,
        estado:                  dto.estado,
        solicitante,
        ficha,
        beneficiarios,
      });

      const saved = await this.prestamoRepository.create(prestamo);

      // Notificar a administradores e instructores encargados
      await this.notificaciones.crearParaGestores(
        'Nueva solicitud de préstamo',
        `${solicitante.nombre} ha solicitado: ${dto.motivo}`,
        'prestamo_nuevo',
        saved.id,
        '/app/prestamos',
      ).catch(() => {}); // no fallar si las notificaciones fallan

      return saved;
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
