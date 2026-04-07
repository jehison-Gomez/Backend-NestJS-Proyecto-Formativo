import { Module } from '@nestjs/common';
import { CentersController } from './infrastructure/http/centers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CenterOrmEntity } from './infrastructure/persistence/center.orm-entity';
import { TypeOrmCenterRepository } from './infrastructure/persistence/typeorm-center.repository';
import { CENTER_REPOSITORY } from './domain/center.repository';
import { CreateCenterUseCase } from './application/use-cases/create-center.use-case';
import { FindOneCenterUseCase } from './application/use-cases/find-one-center.use-case';
import { RemoveCenterUseCase } from './application/use-cases/remove-center.use-case';
import { UpdateCenterUseCase } from './application/use-cases/update-center.use-case';
import { FindAllCentersUseCase } from './application/use-cases/find-all-centers.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CenterOrmEntity])],
  controllers: [CentersController],
  providers: [
    {
      provide: CENTER_REPOSITORY,
      useClass: TypeOrmCenterRepository,
    },
    CreateCenterUseCase,
    FindAllCentersUseCase,
    FindOneCenterUseCase,
    UpdateCenterUseCase,
    RemoveCenterUseCase,
  ],
})
export class CentersModule {}
