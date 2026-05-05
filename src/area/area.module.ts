import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaOrmEntity } from './infrastructure/persistence/area.orm-entity';
import { TypeOrmAreaRepository } from './infrastructure/persistence/typeorm-area.repository';
import { AreaController } from './infrastructure/http/area.controller';
import { AreaRepository } from './domain/area.repository';
import { AreaService } from './area.service';
import { CreateAreaUseCase } from './application/use-cases/create-area.use-case';
import { FindAllAreasUseCase } from './application/use-cases/find-all-areas.use-case';
import { FindOneAreaUseCase } from './application/use-cases/find-one-area.use-case';
import { UpdateAreaUseCase } from './application/use-cases/update-area.use-case';
import { RemoveAreaUseCase } from './application/use-cases/remove-area.use-case';

const USE_CASES = [
  CreateAreaUseCase,
  FindAllAreasUseCase,
  FindOneAreaUseCase,
  UpdateAreaUseCase,
  RemoveAreaUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([AreaOrmEntity])],
  controllers: [AreaController],
  providers: [
    AreaService,
    ...USE_CASES,
    {
      provide: AreaRepository,
      useClass: TypeOrmAreaRepository,
    },
  ],
  exports: [AreaService],
})
export class AreaModule {}
