import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { KardexOrmEntity }               from './infrastructure/persistence/kardex.orm-entity';
import { TypeOrmKardexRepository }       from './infrastructure/persistence/typeorm-kardex.repository';
import { KardexController }              from './infrastructure/http/kardex.controller';

// Domain
import { KardexRepository }              from './domain/kardex.repository';

// Use Cases
import { CreateKardexUseCase }           from './application/use-cases/create-kardex.use-case';
import { FindAllKardexUseCase }          from './application/use-cases/find-all-kardex.use-case';
import { FindOneKardexUseCase }          from './application/use-cases/find-one-kardex.use-case';
import { UpdateKardexUseCase }           from './application/use-cases/update-kardex.use-case';
import { RemoveKardexUseCase }           from './application/use-cases/remove-kardex.use-case';

// Dependencies
import { FichasModule }                  from 'src/fichas/fichas.module';
import { PrestamosModule }               from 'src/prestamos/prestamos.module';
import { UsuariosModule }                from 'src/usuarios/usuarios.module';
import { MaterialesModule }              from 'src/materiales/materiales.module';
import { UbicacionModule }               from 'src/ubicacion/ubicacion.module';
import { MovimientosModule }             from 'src/movimientos/movimientos.module';

const USE_CASES = [
  CreateKardexUseCase,
  FindAllKardexUseCase,
  FindOneKardexUseCase,
  UpdateKardexUseCase,
  RemoveKardexUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([KardexOrmEntity]),
    FichasModule,
    PrestamosModule,
    UsuariosModule,
    MaterialesModule,
    UbicacionModule,
    MovimientosModule,
  ],
  controllers: [KardexController],
  providers: [
    ...USE_CASES,
    {
      provide:  KardexRepository,
      useClass: TypeOrmKardexRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class KardexModule {}
