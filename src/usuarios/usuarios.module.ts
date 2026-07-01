import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { UsuarioOrmEntity }               from './infrastructure/persistence/usuario.orm-entity';
import { TypeOrmUsuarioRepository }       from './infrastructure/persistence/typeorm-usuario.repository';
import { UsuariosController }                from './infrastructure/http/usuarios.controller';

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
import { FichasModule }                      from 'src/fichas/fichas.module';
import { RolesModule }                       from 'src/roles/roles.module';
import { AuthModule }                        from 'src/auth/auth.module';

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
    TypeOrmModule.forFeature([UsuarioOrmEntity]),
    forwardRef(() => FichasModule),
    RolesModule,
    forwardRef(() => AuthModule),
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
