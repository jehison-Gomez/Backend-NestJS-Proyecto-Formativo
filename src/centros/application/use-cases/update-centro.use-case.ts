import { Injectable, NotFoundException } from '@nestjs/common';
import { CentroRepository } from '../../domain/centro.repository';
import { UpdateCentroDto } from '../dto/update-centro.dto';
import { Centro } from '../../domain/centro.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneMunicipioUseCase } from 'src/municipios/application/use-cases/find-one-municipio.use-case';

@Injectable()
export class UpdateCentroUseCase {
  constructor(
    private readonly centroRepository:  CentroRepository,
    private readonly findOneMunicipio:  FindOneMunicipioUseCase,
  ) {}

  async execute(id: string, dto: UpdateCentroDto): Promise<Centro> {
    const exists = await this.centroRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Centro #${id} no encontrado`);

    const municipio = dto.municipioId
      ? await this.findOneMunicipio.execute(dto.municipioId)
      : undefined;

    try {
      return await this.centroRepository.update(id, {
        ...(dto.nombre    !== undefined && { nombre:    dto.nombre }),
        ...(dto.codigo    !== undefined && { codigo:    dto.codigo }),
        ...(dto.direccion !== undefined && { direccion: dto.direccion }),
        ...(dto.estado    !== undefined && { estado:    dto.estado }),
        ...(municipio                  && { municipio }),
      });
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
