import { Injectable } from '@nestjs/common';
import { Usuario_movimientoRepository } from '../../domain/usuario_movimiento.repository';
import { CreateUsuario_movimientoDto } from '../dto/create-usuario_movimiento.dto';
import { Usuario_movimiento } from '../../domain/usuario_movimiento.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneMovimientoUseCase } from 'src/movimientos/application/use-cases/find-one-movimiento.use-case';

@Injectable()
export class CreateUsuario_movimientoUseCase {
  constructor(
    private readonly usuario_movimientoRepository: Usuario_movimientoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOneMovimiento: FindOneMovimientoUseCase,
  ) {}

  async execute(dto: CreateUsuario_movimientoDto): Promise<Usuario_movimiento> {
    const usuario    = await this.findOneUsuario.execute(dto.usuarioId);
    const movimiento = await this.findOneMovimiento.execute(dto.movimientoId);

    try {
      const usuarioMovimiento = new Usuario_movimiento({
        estado: dto.estado,
        usuario,
        movimiento,
      });
      return await this.usuario_movimientoRepository.create(usuarioMovimiento);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
