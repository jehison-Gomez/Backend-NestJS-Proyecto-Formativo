import { Injectable } from '@nestjs/common';
import { CentroRepository } from '../../domain/centro.repository';
import { CreateCentroDto } from '../dto/create-centro.dto';
import { Centro } from '../../domain/centro.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneMunicipioUseCase } from 'src/municipios/application/use-cases/find-one-municipio.use-case';

@Injectable()
export class CreateCentroUseCase {
  constructor(
    private readonly centroRepository: CentroRepository,
    private readonly findOneMunicipio: FindOneMunicipioUseCase,
  ) {}

  async execute(dto: CreateCentroDto): Promise<Centro> {
    const municipio = await this.findOneMunicipio.execute(dto.municipioId);

    try {
      const centro = new Centro({
        nombre: dto.nombre,
        codigo: dto.codigo,
        direccion: dto.direccion,
        estado: dto.estado,
        municipio,
      });
      return await this.centroRepository.create(centro);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
