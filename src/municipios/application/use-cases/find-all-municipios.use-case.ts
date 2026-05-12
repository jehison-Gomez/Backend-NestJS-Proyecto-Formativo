import { Injectable } from '@nestjs/common';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { Municipio } from '../../domain/municipio.entity';

@Injectable()
export class FindAllMunicipiosUseCase {
  constructor(private readonly municipioRepository: MunicipioRepository) {}

  async execute(): Promise<Municipio[]> {
    return this.municipioRepository.findAll();
  }
}
