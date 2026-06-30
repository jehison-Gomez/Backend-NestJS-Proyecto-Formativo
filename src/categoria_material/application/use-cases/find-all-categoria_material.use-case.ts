import { Injectable } from '@nestjs/common';
import { Categoria_materialRepository } from '../../domain/categoria_material.repository';
import { Categoria_material } from '../../domain/categoria_material.entity';

@Injectable()
export class FindAllCategoria_materialUseCase {
  constructor(private readonly categoria_materialRepository: Categoria_materialRepository) {}

  async execute(): Promise<Categoria_material[]> {
    return this.categoria_materialRepository.findAll();
  }
}
