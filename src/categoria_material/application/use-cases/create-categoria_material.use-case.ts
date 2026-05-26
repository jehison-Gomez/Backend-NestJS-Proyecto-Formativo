import { Injectable } from '@nestjs/common';
import { Categoria_materialRepository } from '../../domain/categoria_material.repository';
import { CreateCategoria_materialDto } from '../dto/create-categoria_material.dto';
import { Categoria_material } from '../../domain/categoria_material.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class CreateCategoria_materialUseCase {
  constructor(private readonly categoria_materialRepository: Categoria_materialRepository) {}

  async execute(dto: CreateCategoria_materialDto): Promise<Categoria_material> {
    try {
      const categoria_material = new Categoria_material({ ...dto });
      return await this.categoria_materialRepository.create(categoria_material);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
