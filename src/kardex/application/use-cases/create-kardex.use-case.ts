import { Injectable } from '@nestjs/common';
import { KardexRepository } from '../../domain/kardex.repository';
import { CreateKardexDto } from '../dto/create-kardex.dto';
import { Kardex } from '../../domain/kardex.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { FindOnePrestamoUseCase } from 'src/prestamos/application/use-cases/find-one-prestamo.use-case';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneMaterialeUseCase } from 'src/materiales/application/use-cases/find-one-materiale.use-case';
import { FindOneUbicacionUseCase } from 'src/ubicacion/application/use-cases/find-one-ubicacion.use-case';
import { FindOneMovimientoUseCase } from 'src/movimientos/application/use-cases/find-one-movimiento.use-case';

@Injectable()
export class CreateKardexUseCase {
  constructor(
    private readonly kardexRepository: KardexRepository,
    private readonly findOneFicha: FindOneFichaUseCase,
    private readonly findOnePrestamo: FindOnePrestamoUseCase,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOneMateriale: FindOneMaterialeUseCase,
    private readonly findOneUbicacion: FindOneUbicacionUseCase,
    private readonly findOneMovimiento: FindOneMovimientoUseCase,
  ) {}

  async execute(dto: CreateKardexDto): Promise<Kardex> {
    const ficha      = await this.findOneFicha.execute(dto.fichaId);
    const prestamo   = await this.findOnePrestamo.execute(dto.prestamoId);
    const usuario    = await this.findOneUsuario.execute(dto.usuarioId);
    const material   = await this.findOneMateriale.execute(dto.materialId);
    const ubicacion  = await this.findOneUbicacion.execute(dto.ubicacionId);
    const movimiento = await this.findOneMovimiento.execute(dto.movimientoId);

    try {
      const kardex = new Kardex({
        cantidad:         dto.cantidad,
        cantidadAnterior: dto.cantidadAnterior,
        cantidadActual:   dto.cantidadActual,
        estado:           dto.estado,
        ficha,
        prestamo,
        usuario,
        material,
        ubicacion,
        movimiento,
      });
      return await this.kardexRepository.create(kardex);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
