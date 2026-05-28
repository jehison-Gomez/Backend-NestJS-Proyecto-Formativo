import { BadRequestException, Injectable } from '@nestjs/common';
import { MaterialeRepository } from '../../domain/materiale.repository';
import { CreateMaterialeDto } from '../dto/create-materiale.dto';
import { Materiale } from '../../domain/materiale.entity';
import { TipoMateriale } from '../../domain/tipo-materiale.enum';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneCategoria_materialUseCase } from 'src/categoria_material/application/use-cases/find-one-categoria_material.use-case';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';
import { FindOneMaterial_itemUseCase } from 'src/material_item/application/use-cases/find-one-material_item.use-case';
import { FindOneMaterial_consumibleUseCase } from 'src/material_consumible/application/use-cases/find-one-material_consumible.use-case';

@Injectable()
export class CreateMaterialeUseCase {
  constructor(
    private readonly materialeRepository: MaterialeRepository,
    private readonly findOneCategoriaMaterial: FindOneCategoria_materialUseCase,
    private readonly findOneFicha: FindOneFichaUseCase,
    private readonly findOneMaterialItem: FindOneMaterial_itemUseCase,
    private readonly findOneMaterialConsumible: FindOneMaterial_consumibleUseCase,
  ) {}

  async execute(dto: CreateMaterialeDto): Promise<Materiale> {
    const categoriaMaterial = await this.findOneCategoriaMaterial.execute(dto.categoriaMaterialId);
    const ficha             = await this.findOneFicha.execute(dto.fichaId);

    const materiale = new Materiale({
      nombre:      dto.nombre,
      descripcion: dto.descripcion,
      estado:      dto.estado,
      categoriaMaterial,
      ficha,
    });

    if (dto.tipoMaterial && dto.tipoMaterialId) {
      if (dto.tipoMaterial === TipoMateriale.ITEM) {
        materiale.materialItem      = await this.findOneMaterialItem.execute(dto.tipoMaterialId);
        materiale.materialConsumible = undefined;
      } else {
        materiale.materialConsumible = await this.findOneMaterialConsumible.execute(dto.tipoMaterialId);
        materiale.materialItem       = undefined;
      }
      materiale.tipoMaterial = dto.tipoMaterial;
    } else if (dto.tipoMaterial || dto.tipoMaterialId) {
      throw new BadRequestException('Debe enviar tanto tipoMaterial como tipoMaterialId juntos');
    }

    try {
      return await this.materialeRepository.create(materiale);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
