import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { UsuarioOrmEntity } from './infrastructure/persistence/usuario.orm-entity';
import { TypeOrmUsuarioRepository } from './infrastructure/persistence/typeorm-usuario.repository';
import { UsuariosController } from './infrastructure/http/usuarios.controller';

// Domain
import { UsuarioRepository } from './domain/usuario.repository';

// Application
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioUseCase } from './application/use-cases/create-usuario.use-case';
import { FindAllUsuariosUseCase } from './application/use-cases/find-all-usuarios.use-case';
import { FindOneUsuarioUseCase } from './application/use-cases/find-one-usuario.use-case';
import { UpdateUsuarioUseCase } from './application/use-cases/update-usuario.use-case';
import { RemoveUsuarioUseCase } from './application/use-cases/remove-usuario.use-case';

const USE_CASES = [
  CreateUsuarioUseCase,
  FindAllUsuariosUseCase,
  FindOneUsuarioUseCase,
  UpdateUsuarioUseCase,
  RemoveUsuarioUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    ...USE_CASES,
    {
      provide: UsuarioRepository,
      useClass: TypeOrmUsuarioRepository,
    },
  ],
  exports: [UsuariosService],
})
export class UsuariosModule {}