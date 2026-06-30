import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { Rol_permisoOrmEntity }         from './infrastructure/persistence/rol_permiso.orm-entity';
import { TypeOrmRol_permisoRepository } from './infrastructure/persistence/typeorm-rol_permiso.repository';
import { Rol_permisosController }       from './infrastructure/http/rol_permisos.controller';

// Domain
import { Rol_permisoRepository }        from './domain/rol_permiso.repository';

// Use Cases
import { CreateRol_permisoUseCase }     from './application/use-cases/create-rol_permiso.use-case';
import { FindAllRol_permisosUseCase }   from './application/use-cases/find-all-rol_permisos.use-case';
import { FindOneRol_permisoUseCase }    from './application/use-cases/find-one-rol_permiso.use-case';
import { UpdateRol_permisoUseCase }     from './application/use-cases/update-rol_permiso.use-case';
import { RemoveRol_permisoUseCase }     from './application/use-cases/remove-rol_permiso.use-case';

// Módulos relacionados
import { RolesModule }                  from 'src/roles/roles.module';
import { PermisosModule }               from 'src/permisos/permisos.module';

const USE_CASES = [
  CreateRol_permisoUseCase,
  FindAllRol_permisosUseCase,
  FindOneRol_permisoUseCase,
  UpdateRol_permisoUseCase,
  RemoveRol_permisoUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Rol_permisoOrmEntity]),
    RolesModule,
    PermisosModule,
  ],
  controllers: [Rol_permisosController],
  providers: [
    ...USE_CASES,
    {
      provide:  Rol_permisoRepository,
      useClass: TypeOrmRol_permisoRepository,
    },
  ],
  exports: [...USE_CASES, Rol_permisoRepository],
})
export class Rol_permisosModule {}
