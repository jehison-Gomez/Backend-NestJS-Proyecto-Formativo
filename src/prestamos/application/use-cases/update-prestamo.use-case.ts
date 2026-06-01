import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { UpdatePrestamoDto } from '../dto/update-prestamo.dto';
import { Prestamo } from '../../domain/prestamo.entity';
import { PrestamoEstado } from '../../domain/prestamo-estado.enum';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { CreateMovimientoUseCase } from 'src/movimientos/application/use-cases/create-movimiento.use-case';
import { MovimientoTipo } from 'src/movimientos/domain/movimiento-tipo.enum';
import { UpdateMaterial_itemUseCase } from 'src/material_item/application/use-cases/update-material_item.use-case';
import { UpdateMaterial_consumibleUseCase } from 'src/material_consumible/application/use-cases/update-material_consumible.use-case';
import { FindOneMaterial_itemUseCase } from 'src/material_item/application/use-cases/find-one-material_item.use-case';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';
import { Material_item } from 'src/material_item/domain/material_item.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

@Injectable()
export class UpdatePrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOneFicha: FindOneFichaUseCase,
    @Inject(forwardRef(() => CreateMovimientoUseCase))
    private readonly createMovimiento: CreateMovimientoUseCase,
    private readonly updateMaterialItem: UpdateMaterial_itemUseCase,
    private readonly updateMaterialConsumible: UpdateMaterial_consumibleUseCase,
    private readonly findOneMaterialItem: FindOneMaterial_itemUseCase,
  ) {}

  async execute(id: string, dto: UpdatePrestamoDto): Promise<Prestamo> {
    const exists = await this.prestamoRepository.findOne(id);
    if (!exists) throw new NotFoundException(`Prestamo #${id} no encontrado`);

    const partial: Partial<Prestamo> = {};
    if (dto.motivo      !== undefined) partial.motivo      = dto.motivo;
    if (dto.observacion !== undefined) partial.observacion = dto.observacion;
    if (dto.fechaInicio !== undefined) partial.fechaInicio = new Date(dto.fechaInicio);
    if (dto.fechaFin    !== undefined) partial.fechaFin    = new Date(dto.fechaFin);
    if (dto.estado      !== undefined) partial.estado      = dto.estado;
    if (dto.usuarioId   !== undefined) partial.usuario     = await this.findOneUsuario.execute(dto.usuarioId);
    if (dto.fichaId     !== undefined) partial.ficha       = await this.findOneFicha.execute(dto.fichaId);

    if (dto.beneficiariosIds !== undefined) {
      const beneficiarios: Usuario[] = [];
      for (const uid of dto.beneficiariosIds) {
        beneficiarios.push(await this.findOneUsuario.execute(uid));
      }
      partial.beneficiarios = beneficiarios;
    }

    // Actualizar lista de items antes o durante la aprobación
    if (dto.materialItemIds !== undefined && dto.estado !== PrestamoEstado.APROBADO) {
      const items: Material_item[] = [];
      for (const itemId of dto.materialItemIds) {
        const item = await this.findOneMaterialItem.execute(itemId);
        if (item.estado === Material_itemEstado.PRESTADO) {
          throw new BadRequestException(`El material_item #${itemId} ya está prestado`);
        }
        items.push(item);
      }
      partial.materialItems = items;
    }

    // Al aprobar, se puede pasar lista reducida de items
    if (dto.estado === PrestamoEstado.APROBADO && exists.estado !== PrestamoEstado.APROBADO) {
      let itemsParaAprobar = exists.materialItems ?? [];

      if (dto.materialItemIds !== undefined) {
        itemsParaAprobar = [];
        for (const itemId of dto.materialItemIds) {
          const item = await this.findOneMaterialItem.execute(itemId);
          if (item.estado === Material_itemEstado.PRESTADO) {
            throw new BadRequestException(`El material_item #${itemId} ya está prestado`);
          }
          itemsParaAprobar.push(item);
        }
        partial.materialItems = itemsParaAprobar;
      }

      await this.generarMovimientosSalida({ ...exists, materialItems: itemsParaAprobar }, id);
    }

    if (dto.estado === PrestamoEstado.DEVUELTO && exists.estado !== PrestamoEstado.DEVUELTO) {
      await this.generarMovimientosEntrada(exists, id);
    }

    try {
      return await this.prestamoRepository.update(id, partial);
    } catch (error) {
      handleDbErrors(error);
    }
  }

  private async generarMovimientosSalida(prestamo: Prestamo, prestamoId: string): Promise<void> {
    for (const item of (prestamo.materialItems ?? [])) {
      await this.updateMaterialItem.execute(item.id, { estado: Material_itemEstado.PRESTADO });
      await this.createMovimiento.execute({
        tipo:           MovimientoTipo.SALIDA,
        cantidad:       1,
        descripcion:    `Salida por préstamo aprobado #${prestamoId}`,
        prestamoId,
        materialItemId: item.id,
      });
    }

    for (const detalle of (prestamo.materialConsumibles ?? [])) {
      const consumible = detalle.materialConsumible;
      await this.updateMaterialConsumible.execute(consumible.id, {
        stockActual: consumible.stockActual - detalle.cantidadPrestada,
      });
      await this.createMovimiento.execute({
        tipo:        MovimientoTipo.SALIDA,
        cantidad:    detalle.cantidadPrestada,
        descripcion: `Salida consumible por préstamo aprobado #${prestamoId}`,
        prestamoId,
      });
    }
  }

  private async generarMovimientosEntrada(prestamo: Prestamo, prestamoId: string): Promise<void> {
    for (const item of (prestamo.materialItems ?? [])) {
      await this.updateMaterialItem.execute(item.id, { estado: Material_itemEstado.ACTIVO });
      await this.createMovimiento.execute({
        tipo:           MovimientoTipo.ENTRADA,
        cantidad:       1,
        descripcion:    `Devolución por préstamo #${prestamoId}`,
        prestamoId,
        materialItemId: item.id,
      });
    }
    // Los consumibles NO se devuelven al inventario
  }
}
