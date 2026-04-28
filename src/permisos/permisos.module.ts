import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { PermisoOrmEntity } from './infrastructure/persistence/permiso.orm-entity';
import { TypeOrmPermisoRepository } from './infrastructure/persistence/typeorm-permiso.repository';
import { PermisosController } from './infrastructure/http/permisos.controller';

// Domain
import { PermisoRepository } from './domain/permiso.repository';

// Application
import { PermisosService } from './permisos.service';
import { CreatePermisoUseCase } from './application/use-cases/create-permiso.use-case';
import { FindAllPermisosUseCase } from './application/use-cases/find-all-permisos.use-case';
import { FindOnePermisoUseCase } from './application/use-cases/find-one-permiso.use-case';
import { UpdatePermisoUseCase } from './application/use-cases/update-permiso.use-case';
import { RemovePermisoUseCase } from './application/use-cases/remove-permiso.use-case';

const USE_CASES = [
  CreatePermisoUseCase,
  FindAllPermisosUseCase,
  FindOnePermisoUseCase,
  UpdatePermisoUseCase,
  RemovePermisoUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([PermisoOrmEntity])],
  controllers: [PermisosController],
  providers: [
    PermisosService,
    ...USE_CASES,
    {
      provide: PermisoRepository,
      useClass: TypeOrmPermisoRepository,
    },
  ],
  exports: [PermisosService],
})
export class PermisosModule {}