import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ORM
import { RegionOrmEntity } from './infrastructure/persistence/region.orm-entity';
import { TypeOrmRegionRepository } from './infrastructure/persistence/typeorm-region.repository';

// Controlador
import { RegionsController } from './infrastructure/http/regions.controller';

// Casos de uso
import { CreateRegionUseCase } from './application/use-cases/create-region.use-case';
import { FindAllRegionsUseCase } from './application/use-cases/find-all-regions.use-case';
import { FindOneRegionUseCase } from './application/use-cases/find-one-region.use-case';
import { UpdateRegionUseCase } from './application/use-cases/update-region.use-case';
import { RemoveRegionUseCase } from './application/use-cases/remove-region.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegionOrmEntity])
  ],
  controllers: [RegionsController],
  providers: [
    // Adaptador
    TypeOrmRegionRepository,

    // Casos de uso
    {
      provide: CreateRegionUseCase,
      useFactory: (repo: TypeOrmRegionRepository) =>
        new CreateRegionUseCase(repo),
      inject: [TypeOrmRegionRepository],
    },
    {
      provide: FindAllRegionsUseCase,
      useFactory: (repo: TypeOrmRegionRepository) =>
        new FindAllRegionsUseCase(repo),
      inject: [TypeOrmRegionRepository],
    },
    {
      provide: FindOneRegionUseCase,
      useFactory: (repo: TypeOrmRegionRepository) =>
        new FindOneRegionUseCase(repo),
      inject: [TypeOrmRegionRepository],
    },
    {
      provide: UpdateRegionUseCase,
      useFactory: (repo: TypeOrmRegionRepository, findOne: FindOneRegionUseCase) =>
        new UpdateRegionUseCase(repo, findOne),
      inject: [TypeOrmRegionRepository],
    },
    {
      provide: RemoveRegionUseCase,
      useFactory: (repo: TypeOrmRegionRepository, findOne: FindOneRegionUseCase) =>
        new RemoveRegionUseCase(repo, findOne),
      inject: [TypeOrmRegionRepository],
    },
  ],
})
export class RegionsModule {}
