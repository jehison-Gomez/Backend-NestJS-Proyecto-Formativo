import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { Usuario_permisoOrmEntity }                    from './infrastructure/persistence/usuario_permiso.orm-entity';
import { TypeOrmUsuario_permisoRepository }            from './infrastructure/persistence/typeorm-usuario_permiso.repository';
import { Usuario_permisosController }                  from './infrastructure/http/usuario_permisos.controller';

// Domain
import { UsuarioPermisoRepository }                    from './domain/usuario_permiso.repository';

// Use Cases
import { CreateUsuario_permisoUseCase }                from './application/use-cases/create-usuario_permiso.use-case';
import { FindAllUsuario_permisosUseCase }              from './application/use-cases/find-all-usuario_permisos.use-case';
import { FindOneUsuario_permisoUseCase }               from './application/use-cases/find-one-usuario_permiso.use-case';
import { FindByUsuarioUsuario_permisoUseCase }         from './application/use-cases/find-by-usuario-usuario_permiso.use-case';
import { RemoveUsuario_permisoUseCase }                from './application/use-cases/remove-usuario_permiso.use-case';

// Módulos relacionados
import { UsuariosModule }                              from 'src/usuarios/usuarios.module';
import { PermisosModule }                              from 'src/permisos/permisos.module';

const USE_CASES = [
  CreateUsuario_permisoUseCase,
  FindAllUsuario_permisosUseCase,
  FindOneUsuario_permisoUseCase,
  FindByUsuarioUsuario_permisoUseCase,
  RemoveUsuario_permisoUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario_permisoOrmEntity]),
    UsuariosModule,
    PermisosModule,
  ],
  controllers: [Usuario_permisosController],
  providers: [
    ...USE_CASES,
    {
      provide:  UsuarioPermisoRepository,
      useClass: TypeOrmUsuario_permisoRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class Usuario_permisosModule {}
