import { Injectable } from '@nestjs/common';
import { MaterialeRepository } from '../../domain/materiale.repository';
import { Materiale } from '../../domain/materiale.entity';

@Injectable()
export class FindAllMaterialesUseCase {
  constructor(private readonly materialeRepository: MaterialeRepository) {}

  async execute(): Promise<Materiale[]> {
    return this.materialeRepository.findAll();
  }
}
