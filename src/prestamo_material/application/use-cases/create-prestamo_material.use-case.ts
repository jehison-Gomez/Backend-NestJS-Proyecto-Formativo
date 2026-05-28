import { Injectable } from '@nestjs/common';
import { Prestamo_materialRepository } from '../../domain/prestamo_material.repository';
import { CreatePrestamo_materialDto } from '../dto/create-prestamo_material.dto';
import { Prestamo_material } from '../../domain/prestamo_material.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOnePrestamoUseCase } from 'src/prestamos/application/use-cases/find-one-prestamo.use-case';
import { FindOneMaterialeUseCase } from 'src/materiales/application/use-cases/find-one-materiale.use-case';
import { FindOneDevolucioneUseCase } from 'src/devoluciones/application/use-cases/find-one-devolucione.use-case';

@Injectable()
export class CreatePrestamo_materialUseCase {
  constructor(
    private readonly prestamo_materialRepository: Prestamo_materialRepository,
    private readonly findOnePrestamo: FindOnePrestamoUseCase,
    private readonly findOneMateriale: FindOneMaterialeUseCase,
    private readonly findOneDevolucione: FindOneDevolucioneUseCase,
  ) {}

  async execute(dto: CreatePrestamo_materialDto): Promise<Prestamo_material> {
    const prestamo   = await this.findOnePrestamo.execute(dto.prestamoId);
    const material   = await this.findOneMateriale.execute(dto.materialId);
    const devolucion = dto.devolucionId
      ? await this.findOneDevolucione.execute(dto.devolucionId)
      : undefined;

    try {
      const prestamo_material = new Prestamo_material({
        cantidad: dto.cantidad,
        estado:   dto.estado,
        prestamo,
        material,
        devolucion,
      });
      return await this.prestamo_materialRepository.create(prestamo_material);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
