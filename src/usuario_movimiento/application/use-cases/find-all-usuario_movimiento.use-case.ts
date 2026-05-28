import { Injectable } from '@nestjs/common';
import { Usuario_movimientoRepository } from '../../domain/usuario_movimiento.repository';
import { Usuario_movimiento } from '../../domain/usuario_movimiento.entity';

@Injectable()
export class FindAllUsuario_movimientoUseCase {
  constructor(private readonly usuario_movimientoRepository: Usuario_movimientoRepository) {}

  async execute(): Promise<Usuario_movimiento[]> {
    return this.usuario_movimientoRepository.findAll();
  }
}
