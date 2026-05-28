import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { Usuario_movimientoOrmEntity }               from './infrastructure/persistence/usuario_movimiento.orm-entity';
import { TypeOrmUsuario_movimientoRepository }       from './infrastructure/persistence/typeorm-usuario_movimiento.repository';
import { Usuario_movimientoController }              from './infrastructure/http/usuario_movimiento.controller';

// Domain
import { Usuario_movimientoRepository }              from './domain/usuario_movimiento.repository';

// Use Cases
import { CreateUsuario_movimientoUseCase }           from './application/use-cases/create-usuario_movimiento.use-case';
import { FindAllUsuario_movimientoUseCase }          from './application/use-cases/find-all-usuario_movimiento.use-case';
import { FindOneUsuario_movimientoUseCase }          from './application/use-cases/find-one-usuario_movimiento.use-case';
import { UpdateUsuario_movimientoUseCase }           from './application/use-cases/update-usuario_movimiento.use-case';
import { RemoveUsuario_movimientoUseCase }           from './application/use-cases/remove-usuario_movimiento.use-case';

// Módulos relacionados
import { UsuariosModule }                            from 'src/usuarios/usuarios.module';
import { MovimientosModule }                         from 'src/movimientos/movimientos.module';

const USE_CASES = [
  CreateUsuario_movimientoUseCase,
  FindAllUsuario_movimientoUseCase,
  FindOneUsuario_movimientoUseCase,
  UpdateUsuario_movimientoUseCase,
  RemoveUsuario_movimientoUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario_movimientoOrmEntity]),
    UsuariosModule,
    MovimientosModule,
  ],
  controllers: [Usuario_movimientoController],
  providers: [
    ...USE_CASES,
    {
      provide:  Usuario_movimientoRepository,
      useClass: TypeOrmUsuario_movimientoRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class Usuario_movimientoModule {}
