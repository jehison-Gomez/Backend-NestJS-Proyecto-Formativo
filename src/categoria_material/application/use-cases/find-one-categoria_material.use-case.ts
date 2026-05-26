import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria_materialRepository } from '../../domain/categoria_material.repository';
import { Categoria_material } from '../../domain/categoria_material.entity';

@Injectable()
export class FindOneCategoria_materialUseCase {
  constructor(private readonly categoria_materialRepository: Categoria_materialRepository) {}

  async execute(id: string): Promise<Categoria_material> {
    const categoria_material = await this.categoria_materialRepository.findOne(id);
    if (!categoria_material) throw new NotFoundException(`Categoria_material #${id} no encontrado`);
    return categoria_material;
  }
}
