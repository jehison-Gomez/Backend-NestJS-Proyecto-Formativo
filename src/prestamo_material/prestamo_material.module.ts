import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { Prestamo_materialOrmEntity }          from './infrastructure/persistence/prestamo_material.orm-entity';
import { TypeOrmPrestamo_materialRepository }  from './infrastructure/persistence/typeorm-prestamo_material.repository';
import { Prestamo_materialController }         from './infrastructure/http/prestamo_material.controller';

// Domain
import { Prestamo_materialRepository }         from './domain/prestamo_material.repository';

// Use Cases
import { CreatePrestamo_materialUseCase }      from './application/use-cases/create-prestamo_material.use-case';
import { FindAllPrestamo_materialUseCase }     from './application/use-cases/find-all-prestamo_material.use-case';
import { FindOnePrestamo_materialUseCase }     from './application/use-cases/find-one-prestamo_material.use-case';
import { UpdatePrestamo_materialUseCase }      from './application/use-cases/update-prestamo_material.use-case';
import { RemovePrestamo_materialUseCase }      from './application/use-cases/remove-prestamo_material.use-case';

// Dependencies
import { PrestamosModule }                     from 'src/prestamos/prestamos.module';
import { MaterialesModule }                    from 'src/materiales/materiales.module';
import { DevolucionesModule }                  from 'src/devoluciones/devoluciones.module';

const USE_CASES = [
  CreatePrestamo_materialUseCase,
  FindAllPrestamo_materialUseCase,
  FindOnePrestamo_materialUseCase,
  UpdatePrestamo_materialUseCase,
  RemovePrestamo_materialUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Prestamo_materialOrmEntity]),
    PrestamosModule,
    MaterialesModule,
    DevolucionesModule,
  ],
  controllers: [Prestamo_materialController],
  providers: [
    ...USE_CASES,
    {
      provide:  Prestamo_materialRepository,
      useClass: TypeOrmPrestamo_materialRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class Prestamo_materialModule {}
