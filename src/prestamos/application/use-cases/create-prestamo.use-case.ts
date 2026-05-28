import { Injectable } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { CreatePrestamoDto } from '../dto/create-prestamo.dto';
import { Prestamo } from '../../domain/prestamo.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';

@Injectable()
export class CreatePrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOneFicha: FindOneFichaUseCase,
  ) {}

  async execute(dto: CreatePrestamoDto): Promise<Prestamo> {
    const usuario = await this.findOneUsuario.execute(dto.usuarioId);
    const ficha   = await this.findOneFicha.execute(dto.fichaId);

    try {
      const prestamo = new Prestamo({
        observacion: dto.observacion,
        fechaInicio: new Date(dto.fechaInicio),
        fechaFin:    new Date(dto.fechaFin),
        estado:      dto.estado,
        usuario,
        ficha,
      });
      return await this.prestamoRepository.create(prestamo);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
