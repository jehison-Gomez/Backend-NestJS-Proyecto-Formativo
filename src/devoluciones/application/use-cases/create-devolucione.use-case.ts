import { Injectable } from '@nestjs/common';
import { DevolucioneRepository } from '../../domain/devolucione.repository';
import { CreateDevolucioneDto } from '../dto/create-devolucione.dto';
import { Devolucione } from '../../domain/devolucione.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class CreateDevolucioneUseCase {
  constructor(
    private readonly devolucioneRepository: DevolucioneRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(dto: CreateDevolucioneDto): Promise<Devolucione> {
    const recibidoPor = await this.findOneUsuario.execute(dto.recibidoPorId);

    try {
      const devolucione = new Devolucione({
        fechaDevolucion: new Date(dto.fechaDevolucion),
        observacion:     dto.observacion,
        estado:          dto.estado,
        prestamoId:      dto.prestamoId,
        recibidoPor,
      });
      return await this.devolucioneRepository.create(devolucione);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
