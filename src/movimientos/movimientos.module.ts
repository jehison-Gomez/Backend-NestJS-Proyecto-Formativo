import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { MovimientoOrmEntity }               from './infrastructure/persistence/movimiento.orm-entity';
import { TypeOrmMovimientoRepository }       from './infrastructure/persistence/typeorm-movimiento.repository';
import { MovimientosController }             from './infrastructure/http/movimientos.controller';

// Domain
import { MovimientoRepository }              from './domain/movimiento.repository';

// Use Cases
import { CreateMovimientoUseCase }           from './application/use-cases/create-movimiento.use-case';
import { FindAllMovimientosUseCase }         from './application/use-cases/find-all-movimientos.use-case';
import { FindOneMovimientoUseCase }          from './application/use-cases/find-one-movimiento.use-case';
import { UpdateMovimientoUseCase }           from './application/use-cases/update-movimiento.use-case';
import { RemoveMovimientoUseCase }           from './application/use-cases/remove-movimiento.use-case';

// Módulos relacionados (forwardRef para romper ciclos)
import { PrestamosModule }                   from 'src/prestamos/prestamos.module';
import { Material_itemModule }               from 'src/material_item/material_item.module';
import { Material_consumibleModule }         from 'src/material_consumible/material_consumible.module';

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
    forwardRef(() => PrestamosModule),
    forwardRef(() => Material_itemModule),
    forwardRef(() => Material_consumibleModule),
  ],
  controllers: [MovimientosController],
  providers: [
    ...USE_CASES,
    {
      provide:  MovimientoRepository,
      useClass: TypeOrmMovimientoRepository,
    },
  ],
  exports: [...USE_CASES, MovimientoRepository],
})
export class MovimientosModule {}
