import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { DevolucioneOrmEntity }               from './infrastructure/persistence/devolucione.orm-entity';
import { TypeOrmDevolucioneRepository }       from './infrastructure/persistence/typeorm-devolucione.repository';
import { DevolucionesController }             from './infrastructure/http/devoluciones.controller';

// Domain
import { DevolucioneRepository }              from './domain/devolucione.repository';

// Use Cases
import { CreateDevolucioneUseCase }           from './application/use-cases/create-devolucione.use-case';
import { FindAllDevolucionesUseCase }         from './application/use-cases/find-all-devoluciones.use-case';
import { FindOneDevolucioneUseCase }          from './application/use-cases/find-one-devolucione.use-case';
import { UpdateDevolucioneUseCase }           from './application/use-cases/update-devolucione.use-case';
import { RemoveDevolucioneUseCase }           from './application/use-cases/remove-devolucione.use-case';

// Módulos relacionados
import { UsuariosModule }                     from 'src/usuarios/usuarios.module';

const USE_CASES = [
  CreateDevolucioneUseCase,
  FindAllDevolucionesUseCase,
  FindOneDevolucioneUseCase,
  UpdateDevolucioneUseCase,
  RemoveDevolucioneUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([DevolucioneOrmEntity]),
    UsuariosModule,
  ],
  controllers: [DevolucionesController],
  providers: [
    ...USE_CASES,
    {
      provide:  DevolucioneRepository,
      useClass: TypeOrmDevolucioneRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class DevolucionesModule {}
