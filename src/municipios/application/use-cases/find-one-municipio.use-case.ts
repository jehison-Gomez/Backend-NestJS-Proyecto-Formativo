import { Injectable, NotFoundException } from '@nestjs/common';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { Municipio } from '../../domain/municipio.entity';

@Injectable()
export class FindOneMunicipioUseCase {
  constructor(private readonly municipioRepository: MunicipioRepository) {}

  async execute(id: string): Promise<Municipio> {
    const municipio = await this.municipioRepository.findOne(id);
    if (!municipio) throw new NotFoundException(`Municipio #${id} no encontrado`);
    return municipio;
  }
}
