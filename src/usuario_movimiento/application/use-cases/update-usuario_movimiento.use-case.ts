import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario_movimientoRepository } from '../../domain/usuario_movimiento.repository';
import { UpdateUsuario_movimientoDto } from '../dto/update-usuario_movimiento.dto';
import { Usuario_movimiento } from '../../domain/usuario_movimiento.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneMovimientoUseCase } from 'src/movimientos/application/use-cases/find-one-movimiento.use-case';

@Injectable()
export class UpdateUsuario_movimientoUseCase {
  constructor(
    private readonly usuario_movimientoRepository: Usuario_movimientoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOneMovimiento: FindOneMovimientoUseCase,
  ) {}

  async execute(id: string, dto: UpdateUsuario_movimientoDto): Promise<Usuario_movimiento> {
    const exists = await this.usuario_movimientoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Usuario_movimiento #${id} no encontrado`);

    const partial: Partial<Usuario_movimiento> = {};
    if (dto.estado       !== undefined) partial.estado     = dto.estado;
    if (dto.usuarioId    !== undefined) partial.usuario    = await this.findOneUsuario.execute(dto.usuarioId);
    if (dto.movimientoId !== undefined) partial.movimiento = await this.findOneMovimiento.execute(dto.movimientoId);

    try {
      return await this.usuario_movimientoRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
