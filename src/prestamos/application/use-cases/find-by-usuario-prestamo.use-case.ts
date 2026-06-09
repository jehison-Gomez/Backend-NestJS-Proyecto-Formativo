import { Injectable } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { Prestamo } from '../../domain/prestamo.entity';

@Injectable()
export class FindByUsuarioPrestamoUseCase {
  constructor(private readonly prestamoRepository: PrestamoRepository) {}

  async execute(usuarioId: string): Promise<Prestamo[]> {
    return this.prestamoRepository.findByUsuario(usuarioId);
  }
}
