import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario_movimientoRepository } from '../../domain/usuario_movimiento.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveUsuario_movimientoUseCase {
  constructor(private readonly usuario_movimientoRepository: Usuario_movimientoRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.usuario_movimientoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Usuario_movimiento #${id} no encontrado`);

    try {
      await this.usuario_movimientoRepository.remove(id);
      return { message: `Usuario_movimiento #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
