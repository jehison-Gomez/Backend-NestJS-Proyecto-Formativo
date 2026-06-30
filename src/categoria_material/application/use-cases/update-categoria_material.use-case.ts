import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria_materialRepository } from '../../domain/categoria_material.repository';
import { UpdateCategoria_materialDto } from '../dto/update-categoria_material.dto';
import { Categoria_material } from '../../domain/categoria_material.entity';
import { handleDbErrors } from '../handle-db-errors';

@Injectable()
export class UpdateCategoria_materialUseCase {
  constructor(private readonly categoria_materialRepository: Categoria_materialRepository) {}

  async execute(id: string, dto: UpdateCategoria_materialDto): Promise<Categoria_material> {
    const exists = await this.categoria_materialRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Categoria_material #${id} no encontrado`);

    try {
      const partial: Partial<Categoria_material> = {
        ...(dto.nombre !== undefined && { nombre: dto.nombre }),
        ...(dto.descripcion !== undefined && { descripcion: dto.descripcion }),
        ...(dto.nivel !== undefined && { nivel: dto.nivel }),
        ...(dto.estado !== undefined && { estado: dto.estado }),
        ...(dto.categoriaPadreId !== undefined && {
          categoriaPadre: dto.categoriaPadreId ? ({ id: dto.categoriaPadreId } as any) : null,
        }),
      };
      return await this.categoria_materialRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
