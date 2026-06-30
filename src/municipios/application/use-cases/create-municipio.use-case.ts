import { Injectable } from '@nestjs/common';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { CreateMunicipioDto } from '../dto/create-municipio.dto';
import { Municipio } from '../../domain/municipio.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneDepartamentoUseCase } from 'src/departamentos/application/use-cases/find-one-departamento.use-case';

@Injectable()
export class CreateMunicipioUseCase {
  constructor(
    private readonly municipioRepository: MunicipioRepository,
    private readonly findOneDepartamento: FindOneDepartamentoUseCase,
  ) {}

  async execute(dto: CreateMunicipioDto): Promise<Municipio> {
    const departamento = await this.findOneDepartamento.execute(dto.departamentoId);

    try {
      const municipio = new Municipio({
        nombre: dto.nombre,
        codigo: dto.codigo,
        estado: dto.estado,
        departamento,
      });
      return await this.municipioRepository.create(municipio);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
