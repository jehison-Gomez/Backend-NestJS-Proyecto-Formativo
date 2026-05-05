import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './application/dto/create-area.dto';
import { UpdateAreaDto } from './application/dto/update-area.dto';
import { CreateAreaUseCase } from './application/use-cases/create-area.use-case';
import { FindAllAreasUseCase } from './application/use-cases/find-all-areas.use-case';
import { FindOneAreaUseCase } from './application/use-cases/find-one-area.use-case';
import { UpdateAreaUseCase } from './application/use-cases/update-area.use-case';
import { RemoveAreaUseCase } from './application/use-cases/remove-area.use-case';

@Injectable()
export class AreaService {
  constructor(
    private readonly createAreaUseCase: CreateAreaUseCase,
    private readonly findAllAreasUseCase: FindAllAreasUseCase,
    private readonly findOneAreaUseCase: FindOneAreaUseCase,
    private readonly updateAreaUseCase: UpdateAreaUseCase,
    private readonly removeAreaUseCase: RemoveAreaUseCase,
  ) {}

  create(createAreaDto: CreateAreaDto) {
    return this.createAreaUseCase.execute(createAreaDto);
  }

  findAll() {
    return this.findAllAreasUseCase.execute();
  }

  findOne(id: number) {
    return this.findOneAreaUseCase.execute(id);
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return this.updateAreaUseCase.execute(id, updateAreaDto);
  }

  remove(id: number) {
    return this.removeAreaUseCase.execute(id);
  }
}
