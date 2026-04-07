import { Module } from '@nestjs/common';
import { CentersController } from './infrastructure/http/centers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CenterOrmEntity } from './infrastructure/persistence/center.orm-entity';
import { TypeOrmCenterRepository } from './infrastructure/persistence/typeorm-center.repository';
import { CreateCenterUseCase } from './application/use-cases/create-center.use-case';
import { FindOneCenterUseCase } from './application/use-cases/find-one-center.use-case';
import { RemoveCenterUseCase } from './application/use-cases/remove-center.use-case';
import { UpdateCenterUseCase } from './application/use-cases/update-center.use-case';
import { FindAllCentersUseCase } from './application/use-cases/find-all-centers.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([CenterOrmEntity])
  ],
  controllers: [CentersController],
  providers: [
    TypeOrmCenterRepository,

    {
      provide: CreateCenterUseCase,
      useFactory: (repo: TypeOrmCenterRepository) => 
        new CreateCenterUseCase(repo),
      inject: [TypeOrmCenterRepository],
    },
    {      
      provide: FindAllCentersUseCase,
      useFactory: (repo: TypeOrmCenterRepository) => 
        new FindAllCentersUseCase(repo),
      inject: [TypeOrmCenterRepository],
    },
    {
      provide: FindOneCenterUseCase,
      useFactory: (repo: TypeOrmCenterRepository) => 
        new FindOneCenterUseCase(repo),
      inject: [TypeOrmCenterRepository],
    },
    {
      provide: UpdateCenterUseCase,
      useFactory: (repo: TypeOrmCenterRepository, findOne: FindOneCenterUseCase) => 
        new UpdateCenterUseCase(repo, findOne),
      inject: [TypeOrmCenterRepository, FindOneCenterUseCase],
    },
    {
      provide: RemoveCenterUseCase,
      useFactory: (repo: TypeOrmCenterRepository, findOne: FindOneCenterUseCase) => 
        new RemoveCenterUseCase(repo, findOne),
      inject: [TypeOrmCenterRepository, FindOneCenterUseCase],
    }

  ],
})
export class CentersModule {}
