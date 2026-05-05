import { Injectable } from '@nestjs/common';
import { MunicipioRepository } from '../../domain/municipio.repository';
import { handleDBErrors } from '../handle-db-errors';

@Injectable()
export class RemoveMunicipioUseCase {
  constructor(private readonly repository: MunicipioRepository) {}

  async execute(id: number): Promise<{ message: string }> {
    try {
      await this.repository.remove(id);
      return { message: `Municipio #${id} eliminado correctamente` };
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
