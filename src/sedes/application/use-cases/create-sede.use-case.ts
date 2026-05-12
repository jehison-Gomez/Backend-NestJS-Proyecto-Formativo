import { Injectable } from '@nestjs/common';
import { SedeRepository } from '../../domain/sede.repository';
import { CreateSedeDto } from '../dto/create-sede.dto';
import { Sede } from '../../domain/sede.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneCentroUseCase } from 'src/centros/application/use-cases/find-one-centro.use-case';

@Injectable()
export class CreateSedeUseCase {
  constructor(
    private readonly sedeRepository: SedeRepository,
    private readonly findOneCentro: FindOneCentroUseCase,
  ) {}

  async execute(dto: CreateSedeDto): Promise<Sede> {
    const centro = await this.findOneCentro.execute(dto.centroId);

    try {
      const sede = new Sede({
        nombre: dto.nombre,
        direccion: dto.direccion,
        estado: dto.estado,
        centro,
      });
      return await this.sedeRepository.create(sede);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
