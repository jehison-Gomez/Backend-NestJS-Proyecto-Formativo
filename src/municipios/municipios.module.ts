import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { MunicipioOrmEntity }               from './infrastructure/persistence/municipio.orm-entity';
import { TypeOrmMunicipioRepository }       from './infrastructure/persistence/typeorm-municipio.repository';
import { MunicipiosController }                from './infrastructure/http/municipios.controller';

// Domain
import { MunicipioRepository }              from './domain/municipio.repository';

// Use Cases
import { CreateMunicipioUseCase }           from './application/use-cases/create-municipio.use-case';
import { FindAllMunicipiosUseCase }         from './application/use-cases/find-all-municipios.use-case';
import { FindOneMunicipioUseCase }          from './application/use-cases/find-one-municipio.use-case';
import { UpdateMunicipioUseCase }           from './application/use-cases/update-municipio.use-case';
import { RemoveMunicipioUseCase }           from './application/use-cases/remove-municipio.use-case';
import { DepartamentosModule } from 'src/departamentos/departamentos.module';

const USE_CASES = [
  CreateMunicipioUseCase,
  FindAllMunicipiosUseCase,
  FindOneMunicipioUseCase,
  UpdateMunicipioUseCase,
  RemoveMunicipioUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([MunicipioOrmEntity]),
    DepartamentosModule,
  ],
  controllers: [MunicipiosController],
  providers: [
    ...USE_CASES,
    {
      provide:  MunicipioRepository,
      useClass: TypeOrmMunicipioRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class MunicipiosModule {}
