import { Injectable } from '@nestjs/common';
import { CreateMunicipioDto } from './application/dto/create-municipio.dto';
import { UpdateMunicipioDto } from './application/dto/update-municipio.dto';
import { CreateMunicipioUseCase } from './application/use-cases/create-municipio.use-case';
import { FindAllMunicipiosUseCase } from './application/use-cases/find-all-municipios.use-case';
import { FindOneMunicipioUseCase } from './application/use-cases/find-one-municipio.use-case';
import { UpdateMunicipioUseCase } from './application/use-cases/update-municipio.use-case';
import { RemoveMunicipioUseCase } from './application/use-cases/remove-municipio.use-case';

@Injectable()
export class MunicipioService {
  constructor(
    private readonly createMunicipioUseCase: CreateMunicipioUseCase,
    private readonly findAllMunicipiosUseCase: FindAllMunicipiosUseCase,
    private readonly findOneMunicipioUseCase: FindOneMunicipioUseCase,
    private readonly updateMunicipioUseCase: UpdateMunicipioUseCase,
    private readonly removeMunicipioUseCase: RemoveMunicipioUseCase,
  ) {}

  create(createMunicipioDto: CreateMunicipioDto) {
    return this.createMunicipioUseCase.execute(createMunicipioDto);
  }

  findAll() {
    return this.findAllMunicipiosUseCase.execute();
  }

  findOne(id: number) {
    return this.findOneMunicipioUseCase.execute(id);
  }

  update(id: number, updateMunicipioDto: UpdateMunicipioDto) {
    return this.updateMunicipioUseCase.execute(id, updateMunicipioDto);
  }

  remove(id: number) {
    return this.removeMunicipioUseCase.execute(id);
  }
}
