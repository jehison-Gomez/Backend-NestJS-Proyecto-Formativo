import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrestamoOrmEntity }              from './infrastructure/persistence/prestamo.orm-entity';
import { TypeOrmPrestamoRepository }      from './infrastructure/persistence/typeorm-prestamo.repository';
import { PrestamosController }            from './infrastructure/http/prestamos.controller';
import { PrestamoRepository }             from './domain/prestamo.repository';

import { CreatePrestamoUseCase }          from './application/use-cases/create-prestamo.use-case';
import { FindAllPrestamosUseCase }        from './application/use-cases/find-all-prestamos.use-case';
import { FindOnePrestamoUseCase }         from './application/use-cases/find-one-prestamo.use-case';
import { FindByUsuarioPrestamoUseCase }   from './application/use-cases/find-by-usuario-prestamo.use-case';
import { UpdatePrestamoUseCase }          from './application/use-cases/update-prestamo.use-case';
import { RemovePrestamoUseCase }          from './application/use-cases/remove-prestamo.use-case';
import { ApprovePrestamoUseCase }         from './application/use-cases/approve-prestamo.use-case';
import { RejectPrestamoUseCase }          from './application/use-cases/reject-prestamo.use-case';
import { DeliverPrestamoUseCase }         from './application/use-cases/deliver-prestamo.use-case';
import { ReturnPrestamoUseCase }          from './application/use-cases/return-prestamo.use-case';
import { CambiarUbicacionMaterialUseCase }   from './application/use-cases/cambiar-ubicacion-material.use-case';
import { CheckVencidosPrestamosUseCase }     from './application/use-cases/check-vencidos-prestamos.use-case';
import { FindPorBodegaUseCase }             from './application/use-cases/find-por-bodega.use-case';

import { UsuariosModule }               from 'src/usuarios/usuarios.module';
import { FichasModule }                from 'src/fichas/fichas.module';
import { Material_itemModule }         from 'src/material_item/material_item.module';
import { Material_ubicacionModule }    from 'src/material_ubicacion/material_ubicacion.module';
import { MaterialesModule }            from 'src/materiales/materiales.module';
import { AuthModule }                  from 'src/auth/auth.module';
import { NotificacionesModule }        from 'src/notificaciones/notificaciones.module';
import { PrestamoItemModule }          from 'src/prestamo_item/prestamo_item.module';
import { PrestamoConsumibleModule }    from 'src/prestamo_consumible/prestamo_consumible.module';
import { Material_consumibleModule }   from 'src/material_consumible/material_consumible.module';
import { PrestamoHistorialModule }     from 'src/prestamo_historial/prestamo_historial.module';

const USE_CASES = [
  CreatePrestamoUseCase,
  FindAllPrestamosUseCase,
  FindOnePrestamoUseCase,
  FindByUsuarioPrestamoUseCase,
  UpdatePrestamoUseCase,
  RemovePrestamoUseCase,
  ApprovePrestamoUseCase,
  RejectPrestamoUseCase,
  DeliverPrestamoUseCase,
  ReturnPrestamoUseCase,
  CambiarUbicacionMaterialUseCase,
  CheckVencidosPrestamosUseCase,
  FindPorBodegaUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([PrestamoOrmEntity]),
    UsuariosModule,
    FichasModule,
    Material_itemModule,
    Material_ubicacionModule,
    MaterialesModule,
    AuthModule,
    NotificacionesModule,
    PrestamoItemModule,
    PrestamoConsumibleModule,
    Material_consumibleModule,
    PrestamoHistorialModule,
  ],
  controllers: [PrestamosController],
  providers: [
    ...USE_CASES,
    { provide: PrestamoRepository, useClass: TypeOrmPrestamoRepository },
  ],
  exports: [...USE_CASES, PrestamoRepository],
})
export class PrestamosModule {}
