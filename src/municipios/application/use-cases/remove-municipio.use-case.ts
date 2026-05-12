import { Injectable, NotFoundException } from '@nestjs/common';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class RemoveMunicipioUseCase {
  constructor(private readonly municipioRepository: MunicipioRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    const exists = await this.municipioRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Municipio #${id} no encontrado`);

    try {
      await this.municipioRepository.remove(id);
      return { message: `Municipio #${id} eliminado correctamente` };
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
