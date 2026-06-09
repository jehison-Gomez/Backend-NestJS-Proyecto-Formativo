import { Injectable, NotFoundException } from '@nestjs/common';
import { DevolucioneRepository } from '../../domain/devolucione.repository';
import { UpdateDevolucioneDto } from '../dto/update-devolucione.dto';
import { Devolucione } from '../../domain/devolucione.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class UpdateDevolucioneUseCase {
  constructor(
    private readonly devolucioneRepository: DevolucioneRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(id: string, dto: UpdateDevolucioneDto): Promise<Devolucione> {
    const exists = await this.devolucioneRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Devolución #${id} no encontrada`);

    const partial: Partial<Devolucione> = {};
    if (dto.fechaDevolucion !== undefined) partial.fechaDevolucion = new Date(dto.fechaDevolucion);
    if (dto.observacion     !== undefined) partial.observacion     = dto.observacion;
    if (dto.estado          !== undefined) partial.estado          = dto.estado;
    if (dto.recibidoPorId   !== undefined) partial.recibidoPor     = await this.findOneUsuario.execute(dto.recibidoPorId);

    try {
      return await this.devolucioneRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
