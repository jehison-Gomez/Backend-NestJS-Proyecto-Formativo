import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { AprobacioneOrmEntity }               from './infrastructure/persistence/aprobacione.orm-entity';
import { TypeOrmAprobacioneRepository }       from './infrastructure/persistence/typeorm-aprobacione.repository';
import { AprobacionesController }             from './infrastructure/http/aprobaciones.controller';

// Domain
import { AprobacioneRepository }              from './domain/aprobacione.repository';

// Use Cases
import { CreateAprobacioneUseCase }           from './application/use-cases/create-aprobacione.use-case';
import { FindAllAprobacionesUseCase }         from './application/use-cases/find-all-aprobaciones.use-case';
import { FindOneAprobacioneUseCase }          from './application/use-cases/find-one-aprobacione.use-case';
import { UpdateAprobacioneUseCase }           from './application/use-cases/update-aprobacione.use-case';
import { RemoveAprobacioneUseCase }           from './application/use-cases/remove-aprobacione.use-case';
import { PrestamosModule }                    from 'src/prestamos/prestamos.module';
import { UsuariosModule }                     from 'src/usuarios/usuarios.module';

const USE_CASES = [
  CreateAprobacioneUseCase,
  FindAllAprobacionesUseCase,
  FindOneAprobacioneUseCase,
  UpdateAprobacioneUseCase,
  RemoveAprobacioneUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([AprobacioneOrmEntity]),
    PrestamosModule,
    UsuariosModule,
  ],
  controllers: [AprobacionesController],
  providers: [
    ...USE_CASES,
    {
      provide:  AprobacioneRepository,
      useClass: TypeOrmAprobacioneRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class AprobacionesModule {}
