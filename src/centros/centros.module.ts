import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { CentroOrmEntity }               from './infrastructure/persistence/centro.orm-entity';
import { TypeOrmCentroRepository }       from './infrastructure/persistence/typeorm-centro.repository';
import { CentrosController }                from './infrastructure/http/centros.controller';

// Domain
import { CentroRepository }              from './domain/centro.repository';

// Use Cases
import { CreateCentroUseCase }           from './application/use-cases/create-centro.use-case';
import { FindAllCentrosUseCase }         from './application/use-cases/find-all-centros.use-case';
import { FindOneCentroUseCase }          from './application/use-cases/find-one-centro.use-case';
import { UpdateCentroUseCase }           from './application/use-cases/update-centro.use-case';
import { RemoveCentroUseCase }           from './application/use-cases/remove-centro.use-case';
import { MunicipiosModule } from 'src/municipios/municipios.module';

const USE_CASES = [
  CreateCentroUseCase,
  FindAllCentrosUseCase,
  FindOneCentroUseCase,
  UpdateCentroUseCase,
  RemoveCentroUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([CentroOrmEntity]),
    MunicipiosModule,
  ],
  controllers: [CentrosController],
  providers: [
    ...USE_CASES,
    {
      provide:  CentroRepository,
      useClass: TypeOrmCentroRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class CentrosModule {}
