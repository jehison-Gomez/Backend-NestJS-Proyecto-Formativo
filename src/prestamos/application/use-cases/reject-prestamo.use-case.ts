import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { RejectPrestamoDto } from '../dto/reject-prestamo.dto';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class RejectPrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
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

    return this.prestamoRepository.update(id, partial);
  }
}
