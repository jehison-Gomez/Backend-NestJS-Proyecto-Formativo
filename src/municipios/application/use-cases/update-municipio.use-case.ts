import { Injectable, NotFoundException } from '@nestjs/common';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { UpdateMunicipioDto } from '../dto/update-municipio.dto';
import { Municipio } from '../../domain/municipio.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateMunicipioUseCase {
  constructor(private readonly municipioRepository: MunicipioRepository) {}

  async execute(id: string, dto: UpdateMunicipioDto): Promise<Municipio> {
    const exists = await this.municipioRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Municipio #${id} no encontrado`);

    try {
      return await this.municipioRepository.update(id, dto);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
