import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';

@Injectable()
export class ReturnPrestamoUseCase {
  constructor(private readonly prestamoRepository: PrestamoRepository) {}

  async execute(id: string): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne(id);
    if (!prestamo) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    if (prestamo.estado !== PrestamoEstado.ENTREGADO) {
      throw new BadRequestException(
        `Solo se puede devolver un préstamo en estado ENTREGADO. Estado actual: ${prestamo.estado}`,
      );
    }

    return this.prestamoRepository.update(id, { estado: PrestamoEstado.DEVUELTO });
  }
}
