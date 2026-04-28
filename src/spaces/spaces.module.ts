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

// Domain
import { SPACE_REPOSITORY } from './domain/space.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceOrmEntity])],
  controllers: [SpacesController],
  providers: [
    // Adaptador
    {
      provide: SPACE_REPOSITORY,
      useClass: TypeOrmSpaceRepository,
    },

    // Casos de uso
    CreateSpaceUseCase,
    FindAllSpacesUseCase,
    FindOneSpaceUseCase,
    UpdateSpaceUseCase,
    RemoveSpaceUseCase,
  ],
})
export class SpacesModule {}
