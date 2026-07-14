import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { Tipo_ubicacionOrmEntity }               from './infrastructure/persistence/tipo_ubicacion.orm-entity';
import { TypeOrmTipo_ubicacionRepository }       from './infrastructure/persistence/typeorm-tipo_ubicacion.repository';
import { Tipo_ubicacionController }                from './infrastructure/http/tipo_ubicacion.controller';

// Domain
import { Tipo_ubicacionRepository }              from './domain/tipo_ubicacion.repository';
import { AuthModule }                            from 'src/auth/auth.module';

// Use Cases
import { CreateTipo_ubicacionUseCase }           from './application/use-cases/create-tipo_ubicacion.use-case';
import { FindAllTipo_ubicacionUseCase }         from './application/use-cases/find-all-tipo_ubicacion.use-case';
import { FindOneTipo_ubicacionUseCase }          from './application/use-cases/find-one-tipo_ubicacion.use-case';
import { UpdateTipo_ubicacionUseCase }           from './application/use-cases/update-tipo_ubicacion.use-case';
import { RemoveTipo_ubicacionUseCase }           from './application/use-cases/remove-tipo_ubicacion.use-case';

const USE_CASES = [
  CreateTipo_ubicacionUseCase,
  FindAllTipo_ubicacionUseCase,
  FindOneTipo_ubicacionUseCase,
  UpdateTipo_ubicacionUseCase,
  RemoveTipo_ubicacionUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([Tipo_ubicacionOrmEntity]), AuthModule],
  controllers: [Tipo_ubicacionController],
  providers: [
    ...USE_CASES,
    {
      provide:  Tipo_ubicacionRepository,
      useClass: TypeOrmTipo_ubicacionRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class Tipo_ubicacionModule {}
