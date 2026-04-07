import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ORM
import { AreaOrmEntity } from './infrastructure/persistence/area.orm-entity';
import { TypeOrmAreaRepository } from './infrastructure/persistence/typeorm-area.repository';

// Controlador
import { AreasController } from './infrastructure/http/areas.controller';

// Casos de uso
import { CreateAreaUseCase } from './application/use-cases/create-area.use-case';
import { FindAllAreasUseCase } from './application/use-cases/find-all-areas.use-case';
import { FindOneAreaUseCase } from './application/use-cases/find-one-area.use-case';
import { UpdateAreaUseCase } from './application/use-cases/update-area.use-case';
import { RemoveAreaUseCase } from './application/use-cases/remove-area.use-case';
import { AREA_REPOSITORY } from './domain/area.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AreaOrmEntity])],
  controllers: [AreasController],
  providers: [
    {
      provide: AREA_REPOSITORY,
      useClass: TypeOrmAreaRepository,
    },
    CreateAreaUseCase,
    FindAllAreasUseCase,
    FindOneAreaUseCase,
    UpdateAreaUseCase,
    RemoveAreaUseCase,
  ],
})
export class AreasModule {}
