import { Injectable } from '@nestjs/common';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { Municipio } from '../../domain/municipio.entity';
import { UpdateMunicipioDto } from '../dto/update-municipio.dto';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class UpdateMunicipioUseCase {
  constructor(private readonly repository: MunicipioRepository) {}

  async execute(
    id: number,
    updateMunicipioDto: UpdateMunicipioDto,
  ): Promise<Municipio> {
    try {
      return await this.repository.update(id, updateMunicipioDto);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
