import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { ApprovePrestamoDto } from '../dto/approve-prestamo.dto';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { CreateMovimientoUseCase } from 'src/movimientos/application/use-cases/create-movimiento.use-case';
import { UpdateMaterial_itemUseCase } from 'src/material_item/application/use-cases/update-material_item.use-case';
import { UpdateMaterial_consumibleUseCase } from 'src/material_consumible/application/use-cases/update-material_consumible.use-case';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { MovimientoTipo } from 'src/movimientos/domain/movimiento-tipo.enum';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';

@Injectable()
export class ApprovePrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    @Inject(forwardRef(() => CreateMovimientoUseCase))
    private readonly createMovimiento: CreateMovimientoUseCase,
    private readonly updateMaterialItem: UpdateMaterial_itemUseCase,
    private readonly updateMaterialConsumible: UpdateMaterial_consumibleUseCase,
  ) {}

  async execute(id: string, dto: ApprovePrestamoDto): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne(id);
    if (!prestamo) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    if (prestamo.estado !== PrestamoEstado.PENDIENTE) {
      throw new BadRequestException(
        `Solo se puede aprobar un préstamo en estado PENDIENTE. Estado actual: ${prestamo.estado}`,
      );
    }

    const partial: Partial<Prestamo> = {
      estado:          PrestamoEstado.APROBADO,
      fechaAprobacion: new Date(),
    };

    if (dto.observacion) partial.observacion = dto.observacion;
    if (dto.aprobadoPorId) partial.aprobadoPor = await this.findOneUsuario.execute(dto.aprobadoPorId);

    // Generar movimientos de salida para items
    for (const item of (prestamo.materialItems ?? [])) {
      await this.updateMaterialItem.execute(item.id, { estado: Material_itemEstado.PRESTADO });
      await this.createMovimiento.execute({
        tipo:           MovimientoTipo.SALIDA,
        cantidad:       1,
        descripcion:    `Salida por préstamo aprobado #${id}`,
        prestamoId:     id,
        materialItemId: item.id,
      });
    }

    // Descontar stock de consumibles
    for (const detalle of (prestamo.materialConsumibles ?? [])) {
      const consumible = detalle.materialConsumible;
      await this.updateMaterialConsumible.execute(consumible.id, {
        stockActual: consumible.stockActual - detalle.cantidadPrestada,
      });
      await this.createMovimiento.execute({
        tipo:        MovimientoTipo.SALIDA,
        cantidad:    detalle.cantidadPrestada,
        descripcion: `Salida consumible por préstamo aprobado #${id}`,
        prestamoId:  id,
      });
    }

    return this.prestamoRepository.update(id, partial);
  }
}
