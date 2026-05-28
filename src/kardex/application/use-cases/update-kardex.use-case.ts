import { Injectable, NotFoundException } from '@nestjs/common';
import { KardexRepository } from '../../domain/kardex.repository';
import { UpdateKardexDto } from '../dto/update-kardex.dto';
import { Kardex } from '../../domain/kardex.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { FindOnePrestamoUseCase } from 'src/prestamos/application/use-cases/find-one-prestamo.use-case';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneMaterialeUseCase } from 'src/materiales/application/use-cases/find-one-materiale.use-case';
import { FindOneUbicacionUseCase } from 'src/ubicacion/application/use-cases/find-one-ubicacion.use-case';
import { FindOneMovimientoUseCase } from 'src/movimientos/application/use-cases/find-one-movimiento.use-case';

@Injectable()
export class UpdateKardexUseCase {
  constructor(
    private readonly kardexRepository: KardexRepository,
    private readonly findOneFicha: FindOneFichaUseCase,
    private readonly findOnePrestamo: FindOnePrestamoUseCase,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOneMateriale: FindOneMaterialeUseCase,
    private readonly findOneUbicacion: FindOneUbicacionUseCase,
    private readonly findOneMovimiento: FindOneMovimientoUseCase,
  ) {}

  async execute(id: string, dto: UpdateKardexDto): Promise<Kardex> {
    const exists = await this.kardexRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Kardex #${id} no encontrado`);

    const partial: Partial<Kardex> = {};
    if (dto.cantidad         !== undefined) partial.cantidad         = dto.cantidad;
    if (dto.cantidadAnterior !== undefined) partial.cantidadAnterior = dto.cantidadAnterior;
    if (dto.cantidadActual   !== undefined) partial.cantidadActual   = dto.cantidadActual;
    if (dto.estado           !== undefined) partial.estado           = dto.estado;
    if (dto.fichaId          !== undefined) partial.ficha            = await this.findOneFicha.execute(dto.fichaId);
    if (dto.prestamoId       !== undefined) partial.prestamo         = await this.findOnePrestamo.execute(dto.prestamoId);
    if (dto.usuarioId        !== undefined) partial.usuario          = await this.findOneUsuario.execute(dto.usuarioId);
    if (dto.materialId       !== undefined) partial.material         = await this.findOneMateriale.execute(dto.materialId);
    if (dto.ubicacionId      !== undefined) partial.ubicacion        = await this.findOneUbicacion.execute(dto.ubicacionId);
    if (dto.movimientoId     !== undefined) partial.movimiento       = await this.findOneMovimiento.execute(dto.movimientoId);

    try {
      return await this.kardexRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
