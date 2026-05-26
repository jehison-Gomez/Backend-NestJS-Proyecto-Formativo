import { Injectable } from '@nestjs/common';
import { MaterialeRepository } from '../../domain/materiale.repository';
import { CreateMaterialeDto } from '../dto/create-materiale.dto';
import { Materiale } from '../../domain/materiale.entity';
import { handleDbErrors } from '../handle-db-errors';
import { FindOneCategoria_materialUseCase } from 'src/categoria_material/application/use-cases/find-one-categoria_material.use-case';
import { FindOneFichaUseCase } from 'src/fichas/application/use-cases/find-one-ficha.use-case';

@Injectable()
export class CreateMaterialeUseCase {
  constructor(
    private readonly materialeRepository: MaterialeRepository,
    private readonly findOneCategoriaMaterial: FindOneCategoria_materialUseCase,
    private readonly findOneFicha: FindOneFichaUseCase,
  ) {}

  async execute(dto: CreateMaterialeDto): Promise<Materiale> {
    const categoriaMaterial = await this.findOneCategoriaMaterial.execute(dto.categoriaMaterialId);
    const ficha             = await this.findOneFicha.execute(dto.fichaId);

    try {
      const materiale = new Materiale({
        nombre:      dto.nombre,
        descripcion: dto.descripcion,
        estado:      dto.estado,
        categoriaMaterial,
        ficha,
      });
      return await this.materialeRepository.create(materiale);
    } catch (error) {
      handleDbErrors(error);
    }
  }
}
