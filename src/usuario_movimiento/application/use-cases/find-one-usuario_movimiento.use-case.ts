import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario_movimientoRepository } from '../../domain/usuario_movimiento.repository';
import { Usuario_movimiento } from '../../domain/usuario_movimiento.entity';

@Injectable()
export class FindOneUsuario_movimientoUseCase {
  constructor(private readonly usuario_movimientoRepository: Usuario_movimientoRepository) {}

  async execute(id: string): Promise<Usuario_movimiento> {
    const usuario_movimiento = await this.usuario_movimientoRepository.findOne(id);
    if (!usuario_movimiento) throw new NotFoundException(`Usuario_movimiento #${id} no encontrado`);
    return usuario_movimiento;
  }
}
