import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { PrestamoOrmEntity }                          from './infrastructure/persistence/prestamo.orm-entity';
import { PrestamoMaterialConsumibleOrmEntity }        from './infrastructure/persistence/prestamo-material-consumible.orm-entity';
import { TypeOrmPrestamoRepository }                  from './infrastructure/persistence/typeorm-prestamo.repository';
import { PrestamosController }                        from './infrastructure/http/prestamos.controller';

// Domain
import { PrestamoRepository }                         from './domain/prestamo.repository';

// Use Cases
import { CreatePrestamoUseCase }                      from './application/use-cases/create-prestamo.use-case';
import { FindAllPrestamosUseCase }                    from './application/use-cases/find-all-prestamos.use-case';
import { FindOnePrestamoUseCase }                     from './application/use-cases/find-one-prestamo.use-case';
import { UpdatePrestamoUseCase }                      from './application/use-cases/update-prestamo.use-case';
import { RemovePrestamoUseCase }                      from './application/use-cases/remove-prestamo.use-case';
import { ApprovePrestamoUseCase }                     from './application/use-cases/approve-prestamo.use-case';
import { RejectPrestamoUseCase }                      from './application/use-cases/reject-prestamo.use-case';
import { DeliverPrestamoUseCase }                     from './application/use-cases/deliver-prestamo.use-case';
import { ReturnPrestamoUseCase }                      from './application/use-cases/return-prestamo.use-case';

// Módulos relacionados
import { UsuariosModule }                             from 'src/usuarios/usuarios.module';
import { FichasModule }                               from 'src/fichas/fichas.module';
import { Material_itemModule }                        from 'src/material_item/material_item.module';
import { MaterialesModule }                           from 'src/materiales/materiales.module';
import { Material_consumibleModule }                  from 'src/material_consumible/material_consumible.module';
import { MovimientosModule }                          from 'src/movimientos/movimientos.module';

const USE_CASES = [
  CreatePrestamoUseCase,
  FindAllPrestamosUseCase,
  FindOnePrestamoUseCase,
  UpdatePrestamoUseCase,
  RemovePrestamoUseCase,
  ApprovePrestamoUseCase,
  RejectPrestamoUseCase,
  DeliverPrestamoUseCase,
  ReturnPrestamoUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([PrestamoOrmEntity, PrestamoMaterialConsumibleOrmEntity]),
    UsuariosModule,
    FichasModule,
    Material_itemModule,
    MaterialesModule,
    Material_consumibleModule,
    forwardRef(() => MovimientosModule),
  ],
  controllers: [PrestamosController],
  providers: [
    ...USE_CASES,
    {
      provide:  PrestamoRepository,
      useClass: TypeOrmPrestamoRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class PrestamosModule {}
