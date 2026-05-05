import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentroOrmEntity } from './infrastructure/persistence/centro.orm-entity';
import { TypeOrmCentroRepository } from './infrastructure/persistence/typeorm-centro.repository';
import { CentroController } from './infrastructure/http/centro.controller';
import { CentroRepository } from './domain/centro.repository';
import { CentroService } from './centro.service';
import { CreateCentroUseCase } from './application/use-cases/create-centro.use-case';
import { FindAllCentrosUseCase } from './application/use-cases/find-all-centros.use-case';
import { FindOneCentroUseCase } from './application/use-cases/find-one-centro.use-case';
import { UpdateCentroUseCase } from './application/use-cases/update-centro.use-case';
import { RemoveCentroUseCase } from './application/use-cases/remove-centro.use-case';

const USE_CASES = [
  CreateCentroUseCase,
  FindAllCentrosUseCase,
  FindOneCentroUseCase,
  UpdateCentroUseCase,
  RemoveCentroUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([CentroOrmEntity])],
  controllers: [CentroController],
  providers: [
    CentroService,
    ...USE_CASES,
    {
      provide: CentroRepository,
      useClass: TypeOrmCentroRepository,
    },
  ],
  exports: [CentroService],
})
export class CentroModule {}
