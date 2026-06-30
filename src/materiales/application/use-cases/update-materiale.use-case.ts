import { Injectable, NotFoundException } from '@nestjs/common';
import { MaterialeRepository } from '../../domain/materiale.repository';
import { UpdateMaterialeDto } from '../dto/update-materiale.dto';
import { Materiale } from '../../domain/materiale.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneCategoria_materialUseCase } from 'src/categoria_material/application/use-cases/find-one-categoria_material.use-case';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { FindOneUbicacionUseCase } from 'src/ubicacion/application/use-cases/find-one-ubicacion.use-case';

@Injectable()
export class UpdateMaterialeUseCase {
  constructor(
    private readonly materialeRepository: MaterialeRepository,
    private readonly findOneCategoriaMaterial: FindOneCategoria_materialUseCase,
    private readonly findOneFicha: FindOneFichaUseCase,
    private readonly findOneUbicacion: FindOneUbicacionUseCase,
  ) {}

  async execute(id: string, dto: UpdateMaterialeDto): Promise<Materiale> {
    const exists = await this.materialeRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Material #${id} no encontrado`);

    const partial: Partial<Materiale> = {};
    if (dto.nombre              !== undefined) partial.nombre            = dto.nombre;
    if (dto.descripcion         !== undefined) partial.descripcion       = dto.descripcion;
    if (dto.marca               !== undefined) partial.marca             = dto.marca ?? null;
    if (dto.modelo              !== undefined) partial.modelo            = dto.modelo ?? null;
    if (dto.estado              !== undefined) partial.estado            = dto.estado;
    if (dto.tipo                !== undefined) partial.tipo              = dto.tipo;
    if (dto.categoriaMaterialId !== undefined) partial.categoriaMaterial = await this.findOneCategoriaMaterial.execute(dto.categoriaMaterialId);
    if (dto.fichaId             !== undefined) partial.ficha             = await this.findOneFicha.execute(dto.fichaId);
    if (dto.ubicacionId         !== undefined) partial.ubicacion         = await this.findOneUbicacion.execute(dto.ubicacionId);

    try {
      return await this.materialeRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
