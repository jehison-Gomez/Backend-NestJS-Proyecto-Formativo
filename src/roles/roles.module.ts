import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { RoleOrmEntity }               from './infrastructure/persistence/role.orm-entity';
import { TypeOrmRoleRepository }       from './infrastructure/persistence/typeorm-role.repository';
import { RolesController }             from './infrastructure/http/roles.controller';

// Domain
import { RoleRepository }              from './domain/role.repository';

// Use Cases
import { CreateRoleUseCase }           from './application/use-cases/create-role.use-case';
import { FindAllRolesUseCase }         from './application/use-cases/find-all-roles.use-case';
import { FindOneRoleUseCase }          from './application/use-cases/find-one-role.use-case';
import { UpdateRoleUseCase }           from './application/use-cases/update-role.use-case';
import { RemoveRoleUseCase }           from './application/use-cases/remove-role.use-case';

// ORM entity para inyección directa (evita dependencia circular con Rol_permisosModule)
import { Rol_permisoOrmEntity }        from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';

const USE_CASES = [
  CreateRoleUseCase,
  FindAllRolesUseCase,
  FindOneRoleUseCase,
  UpdateRoleUseCase,
  RemoveRoleUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleOrmEntity, Rol_permisoOrmEntity]),
  ],
  controllers: [RolesController],
  providers: [
    ...USE_CASES,
    {
      provide:  RoleRepository,
      useClass: TypeOrmRoleRepository,
    },
  ],
  exports: [...USE_CASES, RoleRepository],
})
export class RolesModule {}
