import { Injectable, NotFoundException } from '@nestjs/common';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { Municipio } from '../../domain/municipio.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class FindOneMunicipioUseCase {
  constructor(private readonly repository: MunicipioRepository) {}

  async execute(id: number): Promise<Municipio> {
    try {
      const municipio = await this.repository.findOne(id);
      if (!municipio) {
        throw new NotFoundException(`Municipio #${id} no encontrado`);
      }
      return municipio;
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
