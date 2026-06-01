import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';

@Injectable()
export class DeliverPrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
  ) {}

  async execute(id: string): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne(id);
    if (!prestamo) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    if (prestamo.estado !== PrestamoEstado.APROBADO) {
      throw new BadRequestException(
        `Solo se puede entregar un préstamo en estado APROBADO. Estado actual: ${prestamo.estado}`,
      );
    }

    return this.prestamoRepository.update(id, {
      estado:       PrestamoEstado.ACTIVO,
      fechaEntrega: new Date(),
    });
  }
}
