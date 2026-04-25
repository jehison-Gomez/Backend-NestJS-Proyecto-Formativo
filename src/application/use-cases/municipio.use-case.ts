import { Municipio } from '../../domain/entities/municipio.entity';
import { MunicipioRepository } from '../../domain/repositories/municipio.repository';

export class MunicipioUseCase {
  constructor(private readonly municipioRepository: MunicipioRepository) {}

  findAll(): Promise<Municipio[]> {
    return this.municipioRepository.findAll();
  }
}