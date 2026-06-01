import { BadRequestException, Injectable } from '@nestjs/common';
import { PrestamoRepository } from '../../domain/prestamo.repository';
import { CreatePrestamoDto } from '../dto/create-prestamo.dto';
import { Prestamo, PrestamoConsumibleDetalle } from '../../domain/prestamo.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneUsuarioUseCase } from 'src/usuarios/application/use-cases/find-one-usuario.use-case';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { FindOneMaterial_itemUseCase } from 'src/material_item/application/use-cases/find-one-material_item.use-case';
import { FindOneMaterialeUseCase } from 'src/materiales/application/use-cases/find-one-materiale.use-case';
import { FindOneMaterial_consumibleUseCase } from 'src/material_consumible/application/use-cases/find-one-material_consumible.use-case';
import { Material_itemEstado } from 'src/material_item/domain/material_item-estado.enum';
import { Material_item } from 'src/material_item/domain/material_item.entity';
import { Usuario } from 'src/usuarios/domain/usuario.entity';

@Injectable()
export class CreatePrestamoUseCase {
  constructor(
    private readonly prestamoRepository: PrestamoRepository,
    private readonly findOneUsuario: FindOneUsuarioUseCase,
    private readonly findOneFicha: FindOneFichaUseCase,
    private readonly findOneMaterialItem: FindOneMaterial_itemUseCase,
    private readonly findOneMateriale: FindOneMaterialeUseCase,
    private readonly findOneMaterialConsumible: FindOneMaterial_consumibleUseCase,
  ) {}

  async execute(dto: CreatePrestamoDto): Promise<Prestamo> {
    const usuario = await this.findOneUsuario.execute(dto.usuarioId);
    const ficha   = await this.findOneFicha.execute(dto.fichaId);

    const beneficiarios: Usuario[] = [];
    if (dto.beneficiariosIds?.length) {
      for (const uid of dto.beneficiariosIds) {
        beneficiarios.push(await this.findOneUsuario.execute(uid));
      }
    }

    const materialItems: Material_item[] = [];
    if (dto.materialItemIds?.length) {
      for (const itemId of dto.materialItemIds) {
        const item = await this.findOneMaterialItem.execute(itemId);
        if (item.estado === Material_itemEstado.PRESTADO) {
          throw new BadRequestException(`El material_item #${itemId} ya está prestado`);
        }
        materialItems.push(item);
      }
    }

    const materialConsumibles: PrestamoConsumibleDetalle[] = [];
    if (dto.materialConsumibles?.length) {
      for (const mc of dto.materialConsumibles) {
        const materiale          = await this.findOneMateriale.execute(mc.materialeId);
        const materialConsumible = await this.findOneMaterialConsumible.execute(mc.materialConsumibleId);
        if (materialConsumible.stockActual < mc.cantidadPrestada) {
          throw new BadRequestException(
            `Stock insuficiente para el consumible del material #${mc.materialeId}. Disponible: ${materialConsumible.stockActual}`,
          );
        }
        materialConsumibles.push({ materiale, materialConsumible, cantidadPrestada: mc.cantidadPrestada });
      }
    }

    try {
      const prestamo = new Prestamo({
        motivo:              dto.motivo,
        observacion:         dto.observacion,
        fechaInicio:         new Date(dto.fechaInicio),
        fechaFin:            new Date(dto.fechaFin),
        estado:              dto.estado,
        usuario,
        ficha,
        beneficiarios,
        materialItems,
        materialConsumibles,
      });
      return await this.prestamoRepository.create(prestamo);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
