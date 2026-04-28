import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { RolPermisoOrmEntity } from './infrastructure/persistence/rol_permiso.orm-entity';
import { TypeOrmRolPermisoRepository } from './infrastructure/persistence/typeorm-rol_permiso.repository';
import { RolPermisosController } from './infrastructure/http/rol_permisos.controller';

// Domain
import { RolPermisoRepository } from './domain/rol_permiso.repository';

// Application
import { RolPermisosService } from './rol_permisos.service';
import { CreateRolPermisoUseCase } from './application/use-cases/create-rol_permiso.use-case';
import { FindAllRolPermisosUseCase } from './application/use-cases/find-all-rol_permisos.use-case';
import { FindOneRolPermisoUseCase } from './application/use-cases/find-one-rol_permiso.use-case';
import { UpdateRolPermisoUseCase } from './application/use-cases/update-rol_permiso.use-case';
import { RemoveRolPermisoUseCase } from './application/use-cases/remove-rol_permiso.use-case';

const USE_CASES = [
  CreateRolPermisoUseCase,
  FindAllRolPermisosUseCase,
  FindOneRolPermisoUseCase,
  UpdateRolPermisoUseCase,
  RemoveRolPermisoUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([RolPermisoOrmEntity])],
  controllers: [RolPermisosController],
  providers: [
    RolPermisosService,
    ...USE_CASES,
    {
      provide: RolPermisoRepository,
      useClass: TypeOrmRolPermisoRepository,
    },
  ],
  exports: [RolPermisosService],
})
export class RolPermisosModule {}