import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { AreaOrmEntity }               from './infrastructure/persistence/area.orm-entity';
import { TypeOrmAreaRepository }       from './infrastructure/persistence/typeorm-area.repository';
import { AreasController }                from './infrastructure/http/areas.controller';

// Domain
import { AreaRepository }              from './domain/area.repository';

// Use Cases
import { CreateAreaUseCase }           from './application/use-cases/create-area.use-case';
import { FindAllAreasUseCase }         from './application/use-cases/find-all-areas.use-case';
import { FindOneAreaUseCase }          from './application/use-cases/find-one-area.use-case';
import { UpdateAreaUseCase }           from './application/use-cases/update-area.use-case';
import { RemoveAreaUseCase }           from './application/use-cases/remove-area.use-case';
import { SedesModule }                 from 'src/sedes/sedes.module';
import { UsuariosModule }               from 'src/usuarios/usuarios.module';

const USE_CASES = [
  CreateAreaUseCase,
  FindAllAreasUseCase,
  FindOneAreaUseCase,
  UpdateAreaUseCase,
  RemoveAreaUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([AreaOrmEntity]),
    SedesModule,
    UsuariosModule,
  ],
  controllers: [AreasController],
  providers: [
    ...USE_CASES,
    {
      provide:  AreaRepository,
      useClass: TypeOrmAreaRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class AreasModule {}
