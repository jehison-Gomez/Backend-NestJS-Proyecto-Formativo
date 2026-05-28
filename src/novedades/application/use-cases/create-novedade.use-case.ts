import { Injectable } from '@nestjs/common';
import { NovedadeRepository } from '../../domain/novedade.repository';
import { CreateNovedadeDto } from '../dto/create-novedade.dto';
import { Novedade } from '../../domain/novedade.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneDevolucioneUseCase } from 'src/devoluciones/application/use-cases/find-one-devolucione.use-case';

@Injectable()
export class CreateNovedadeUseCase {
  constructor(
    private readonly novedadeRepository: NovedadeRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOneDevolucion: FindOneDevolucioneUseCase,
  ) {}

  async execute(dto: CreateNovedadeDto): Promise<Novedade> {
    const usuario    = await this.findOneUsuario.execute(dto.usuarioId);
    const devolucion = await this.findOneDevolucion.execute(dto.devolucionId);

    try {
      const novedade = new Novedade({
        descripcion: dto.descripcion,
        tipo:        dto.tipo,
        estado:      dto.estado,
        usuario,
        devolucion,
      });
      return await this.novedadeRepository.create(novedade);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
