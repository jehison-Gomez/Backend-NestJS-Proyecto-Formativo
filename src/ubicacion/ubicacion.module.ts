import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { UbicacionOrmEntity }               from './infrastructure/persistence/ubicacion.orm-entity';
import { TypeOrmUbicacionRepository }       from './infrastructure/persistence/typeorm-ubicacion.repository';
import { UbicacionController }              from './infrastructure/http/ubicacion.controller';

// Domain
import { UbicacionRepository }              from './domain/ubicacion.repository';

// Use Cases
import { CreateUbicacionUseCase }           from './application/use-cases/create-ubicacion.use-case';
import { FindAllUbicacionUseCase }          from './application/use-cases/find-all-ubicacion.use-case';
import { FindOneUbicacionUseCase }          from './application/use-cases/find-one-ubicacion.use-case';
import { UpdateUbicacionUseCase }           from './application/use-cases/update-ubicacion.use-case';
import { RemoveUbicacionUseCase }           from './application/use-cases/remove-ubicacion.use-case';
import { FindMiBodegaUseCase }              from './application/use-cases/find-mi-bodega.use-case';

// Módulos relacionados
import { Tipo_ubicacionModule }             from 'src/tipo_ubicacion/tipo_ubicacion.module';
import { AreasModule }                      from 'src/areas/areas.module';
import { AuthModule }                       from 'src/auth/auth.module';
import { UsuariosModule }                   from 'src/usuarios/usuarios.module';

const USE_CASES = [
  CreateUbicacionUseCase,
  FindAllUbicacionUseCase,
  FindOneUbicacionUseCase,
  UpdateUbicacionUseCase,
  RemoveUbicacionUseCase,
  FindMiBodegaUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UbicacionOrmEntity]),
    Tipo_ubicacionModule,
    AreasModule,
    AuthModule,
    UsuariosModule,
  ],
  controllers: [UbicacionController],
  providers: [
    ...USE_CASES,
    {
      provide:  UbicacionRepository,
      useClass: TypeOrmUbicacionRepository,
    },
  ],
  exports: [...USE_CASES, UbicacionRepository],
})
export class UbicacionModule {}
