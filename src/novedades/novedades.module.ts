import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { NovedadeOrmEntity }               from './infrastructure/persistence/novedade.orm-entity';
import { TypeOrmNovedadeRepository }       from './infrastructure/persistence/typeorm-novedade.repository';
import { NovedadesController }             from './infrastructure/http/novedades.controller';

// Domain
import { NovedadeRepository }              from './domain/novedade.repository';

// Use Cases
import { CreateNovedadeUseCase }           from './application/use-cases/create-novedade.use-case';
import { FindAllNovedadesUseCase }         from './application/use-cases/find-all-novedades.use-case';
import { FindOneNovedadeUseCase }          from './application/use-cases/find-one-novedade.use-case';
import { UpdateNovedadeUseCase }           from './application/use-cases/update-novedade.use-case';
import { RemoveNovedadeUseCase }           from './application/use-cases/remove-novedade.use-case';

// Módulos relacionados
import { UsuariosModule }                  from 'src/usuarios/usuarios.module';

const USE_CASES = [
  CreateNovedadeUseCase,
  FindAllNovedadesUseCase,
  FindOneNovedadeUseCase,
  UpdateNovedadeUseCase,
  RemoveNovedadeUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([NovedadeOrmEntity]),
    UsuariosModule,
  ],
  controllers: [NovedadesController],
  providers: [
    ...USE_CASES,
    {
      provide:  NovedadeRepository,
      useClass: TypeOrmNovedadeRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class NovedadesModule {}
