import { Injectable } from '@nestjs/common';
import { AprobacioneRepository } from '../../domain/aprobacione.repository';
import { CreateAprobacioneDto } from '../dto/create-aprobacione.dto';
import { Aprobacione } from '../../domain/aprobacione.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOnePrestamoUseCase } from 'src/prestamos/application/use-cases/find-one-prestamo.use-case';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';

@Injectable()
export class CreateAprobacioneUseCase {
  constructor(
    private readonly aprobacioneRepository: AprobacioneRepository,
    private readonly findOnePrestamo: FindOnePrestamoUseCase,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
  ) {}

  async execute(dto: CreateAprobacioneDto): Promise<Aprobacione> {
    const prestamo = await this.findOnePrestamo.execute(dto.prestamoId);
    const usuario  = await this.findOneUsuario.execute(dto.usuarioId);

    try {
      const aprobacione = new Aprobacione({
        decision:    dto.decision,
        observacion: dto.observacion,
        estado:      dto.estado,
        prestamo,
        usuario,
      });
      return await this.aprobacioneRepository.create(aprobacione);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
