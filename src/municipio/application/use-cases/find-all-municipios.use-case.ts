import { Injectable } from '@nestjs/common';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { Municipio } from '../../domain/municipio.entity';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class FindAllMunicipiosUseCase {
  constructor(private readonly repository: MunicipioRepository) {}

  async execute(): Promise<Municipio[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
