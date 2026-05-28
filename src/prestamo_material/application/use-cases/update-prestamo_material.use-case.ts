import { Injectable, NotFoundException } from '@nestjs/common';
import { Prestamo_materialRepository } from '../../domain/prestamo_material.repository';
import { UpdatePrestamo_materialDto } from '../dto/update-prestamo_material.dto';
import { Prestamo_material } from '../../domain/prestamo_material.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOnePrestamoUseCase } from 'src/prestamos/application/use-cases/find-one-prestamo.use-case';
import { FindOneMaterialeUseCase } from 'src/materiales/application/use-cases/find-one-materiale.use-case';
import { FindOneDevolucioneUseCase } from 'src/devoluciones/application/use-cases/find-one-devolucione.use-case';

@Injectable()
export class UpdatePrestamo_materialUseCase {
  constructor(
    private readonly prestamo_materialRepository: Prestamo_materialRepository,
    private readonly findOnePrestamo: FindOnePrestamoUseCase,
    private readonly findOneMateriale: FindOneMaterialeUseCase,
    private readonly findOneDevolucione: FindOneDevolucioneUseCase,
  ) {}

  async execute(id: string, dto: UpdatePrestamo_materialDto): Promise<Prestamo_material> {
    const exists = await this.prestamo_materialRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Prestamo_material #${id} no encontrado`);

    const partial: Partial<Prestamo_material> = {};
    if (dto.cantidad      !== undefined) partial.cantidad   = dto.cantidad;
    if (dto.estado        !== undefined) partial.estado     = dto.estado;
    if (dto.prestamoId    !== undefined) partial.prestamo   = await this.findOnePrestamo.execute(dto.prestamoId);
    if (dto.materialId    !== undefined) partial.material   = await this.findOneMateriale.execute(dto.materialId);
    if (dto.devolucionId  !== undefined) partial.devolucion = await this.findOneDevolucione.execute(dto.devolucionId);

    try {
      return await this.prestamo_materialRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
