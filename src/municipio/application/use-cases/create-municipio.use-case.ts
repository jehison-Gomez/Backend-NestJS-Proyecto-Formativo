import { Injectable } from '@nestjs/common';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { Municipio } from '../../domain/municipio.entity';
import { CreateMunicipioDto } from '../dto/create-municipio.dto';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class CreateMunicipioUseCase {
  constructor(private readonly repository: MunicipioRepository) {}

  async execute(createMunicipioDto: CreateMunicipioDto): Promise<Municipio> {
    try {
      const municipio = new Municipio({
        ...createMunicipioDto,
        estado: createMunicipioDto.estado ?? true,
      });
      return await this.repository.create(municipio);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
