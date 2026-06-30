import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { UsuarioOrmEntity }               from './infrastructure/persistence/usuario.orm-entity';
import { TypeOrmUsuarioRepository }       from './infrastructure/persistence/typeorm-usuario.repository';
import { UsuariosController }             from './infrastructure/http/usuarios.controller';

// Domain
import { UsuarioRepository }              from './domain/usuario.repository';

// Use Cases
import { CreateUsuarioUseCase }              from './application/use-cases/create-usuario.use-case';
import { FindAllUsuariosUseCase }            from './application/use-cases/find-all-usuarios.use-case';
import { FindUsuariosConFiltrosUseCase }     from './application/use-cases/find-usuarios-con-filtros.use-case';
import { FindOneUsuarioUseCase }             from './application/use-cases/find-one-usuario.use-case';
import { UpdateUsuarioUseCase }              from './application/use-cases/update-usuario.use-case';
import { RemoveUsuarioUseCase }              from './application/use-cases/remove-usuario.use-case';
import { CalculateUserPermissionsUseCase }   from './application/use-cases/calculate-user-permissions.use-case';

// Módulos relacionados
import { FichasModule }                      from 'src/fichas/fichas.module';
import { RolesModule }                       from 'src/roles/roles.module';
import { SedesModule }                       from 'src/sedes/sedes.module';

// ORM entities para inyección directa (evita dependencias circulares)
import { Usuario_permisoOrmEntity }          from 'src/usuario_permisos/infrastructure/persistence/usuario_permiso.orm-entity';
import { Rol_permisoOrmEntity }              from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';

const USE_CASES = [
  CreateUsuarioUseCase,
  FindAllUsuariosUseCase,
  FindUsuariosConFiltrosUseCase,
  FindOneUsuarioUseCase,
  UpdateUsuarioUseCase,
  RemoveUsuarioUseCase,
  CalculateUserPermissionsUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioOrmEntity, Usuario_permisoOrmEntity, Rol_permisoOrmEntity]),
    forwardRef(() => FichasModule),
    RolesModule,
    SedesModule,
  ],
  controllers: [UsuariosController],
  providers: [
    ...USE_CASES,
    {
      provide:  UsuarioRepository,
      useClass: TypeOrmUsuarioRepository,
    },
  ],
  exports: [...USE_CASES, UsuarioRepository],
})
export class UsuariosModule {}
