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

@Module({
  imports: [
    TypeOrmModule.forFeature([AreaOrmEntity])
  ],
  controllers: [AreasController],
  providers: [
    // Adaptador
    TypeOrmAreaRepository,

    // Casos de uso
    {
      provide: CreateAreaUseCase,
      useFactory: (repo: TypeOrmAreaRepository) =>
        new CreateAreaUseCase(repo),
      inject: [TypeOrmAreaRepository],
    },
    {
      provide: FindAllAreasUseCase,
      useFactory: (repo: TypeOrmAreaRepository) =>
        new FindAllAreasUseCase(repo),
      inject: [TypeOrmAreaRepository],
    },
    {
      provide: FindOneAreaUseCase,
      useFactory: (repo: TypeOrmAreaRepository) =>
        new FindOneAreaUseCase(repo),
      inject: [TypeOrmAreaRepository],
    },
    {
      provide: UpdateAreaUseCase,
      useFactory: (repo: TypeOrmAreaRepository, findOne: FindOneAreaUseCase) =>
        new UpdateAreaUseCase(repo, findOne),
      inject: [TypeOrmAreaRepository, FindOneAreaUseCase],
    },
    {
      provide: RemoveAreaUseCase,
      useFactory: (repo: TypeOrmAreaRepository, findOne: FindOneAreaUseCase) =>
        new RemoveAreaUseCase(repo, findOne),
      inject: [TypeOrmAreaRepository, FindOneAreaUseCase],
    },
  ],
})
export class AreasModule {}
