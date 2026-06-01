import { Injectable } from '@nestjs/common';
import { Material_itemRepository } from '../../domain/material_item.repository';
import { CreateMaterial_itemDto } from '../dto/create-material_item.dto';
import { Material_item } from '../../domain/material_item.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneMaterialeUseCase } from 'src/materiales/application/use-cases/find-one-materiale.use-case';

@Injectable()
export class CreateMaterial_itemUseCase {
  constructor(
    private readonly material_itemRepository: Material_itemRepository,
    private readonly findOneMateriale: FindOneMaterialeUseCase,
  ) {}

  async execute(dto: CreateMaterial_itemDto): Promise<Material_item> {
    const materiale = await this.findOneMateriale.execute(dto.materialeId);

    try {
      const material_item = new Material_item({
        codigoSena:  dto.codigoSena,
        condicion:   dto.condicion,
        observacion: dto.observacion,
        estadoItem:  dto.estadoItem,
        estado:      dto.estado,
        materiale,
      });
      return await this.material_itemRepository.create(material_item);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
