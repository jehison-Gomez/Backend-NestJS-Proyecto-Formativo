import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ORM
import { SpaceOrmEntity } from './infrastructure/persistence/space.orm-entity';
import { TypeOrmSpaceRepository } from './infrastructure/persistence/typeorm-space.repository';

// Controlador
import { SpacesController } from './infrastructure/http/spaces.controller';

// Casos de uso
import { CreateSpaceUseCase } from './application/use-cases/create-space.use-case';
import { FindAllSpacesUseCase } from './application/use-cases/find-all-spaces.use-case';
import { FindOneSpaceUseCase } from './application/use-cases/find-one-space.use-case';
import { UpdateSpaceUseCase } from './application/use-cases/update-space.use-case';
import { RemoveSpaceUseCase } from './application/use-cases/remove-space.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpaceOrmEntity])
  ],
  controllers: [SpacesController],
  providers: [
    // Adaptador
    TypeOrmSpaceRepository,

    // Casos de uso
    {
      provide: CreateSpaceUseCase,
      useFactory: (repo: TypeOrmSpaceRepository) =>
        new CreateSpaceUseCase(repo),
      inject: [TypeOrmSpaceRepository],
    },
    {
      provide: FindAllSpacesUseCase,
      useFactory: (repo: TypeOrmSpaceRepository) =>
        new FindAllSpacesUseCase(repo),
      inject: [TypeOrmSpaceRepository],
    },
    {
      provide: FindOneSpaceUseCase,
      useFactory: (repo: TypeOrmSpaceRepository) =>
        new FindOneSpaceUseCase(repo),
      inject: [TypeOrmSpaceRepository],
    },
    {
      provide: UpdateSpaceUseCase,
      useFactory: (repo: TypeOrmSpaceRepository, findOne: FindOneSpaceUseCase) =>
        new UpdateSpaceUseCase(repo, findOne),
      inject: [TypeOrmSpaceRepository, FindOneSpaceUseCase],
    },
    {
      provide: RemoveSpaceUseCase,
      useFactory: (repo: TypeOrmSpaceRepository, findOne: FindOneSpaceUseCase) =>
        new RemoveSpaceUseCase(repo, findOne),
      inject: [TypeOrmSpaceRepository, FindOneSpaceUseCase],
    },
  ],
})
export class SpacesModule {}
