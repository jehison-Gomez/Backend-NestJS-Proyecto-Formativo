import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovimientoOrmEntity }               from './infrastructure/persistence/movimiento.orm-entity';
import { TypeOrmMovimientoRepository }       from './infrastructure/persistence/typeorm-movimiento.repository';
import { MovimientosController }             from './infrastructure/http/movimientos.controller';
import { MovimientoRepository }              from './domain/movimiento.repository';

import { CreateMovimientoUseCase }           from './application/use-cases/create-movimiento.use-case';
import { FindAllMovimientosUseCase }         from './application/use-cases/find-all-movimientos.use-case';
import { FindOneMovimientoUseCase }          from './application/use-cases/find-one-movimiento.use-case';
import { UpdateMovimientoUseCase }           from './application/use-cases/update-movimiento.use-case';
import { RemoveMovimientoUseCase }           from './application/use-cases/remove-movimiento.use-case';
import { KardexModule }                      from 'src/kardex/kardex.module';

const USE_CASES = [
  CreateMovimientoUseCase,
  FindAllMovimientosUseCase,
  FindOneMovimientoUseCase,
  UpdateMovimientoUseCase,
  RemoveMovimientoUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([MovimientoOrmEntity]),
    KardexModule,
  ],
  controllers: [MovimientosController],
  providers: [
    ...USE_CASES,
    { provide: MovimientoRepository, useClass: TypeOrmMovimientoRepository },
  ],
  exports: [...USE_CASES, MovimientoRepository],
})
export class MovimientosModule {}
