import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { Material_ubicacionOrmEntity }         from './infrastructure/persistence/material_ubicacion.orm-entity';
import { TypeOrmMaterial_ubicacionRepository } from './infrastructure/persistence/typeorm-material_ubicacion.repository';
import { Material_ubicacionController }        from './infrastructure/http/material_ubicacion.controller';

// Domain
import { Material_ubicacionRepository }        from './domain/material_ubicacion.repository';

// Use Cases
import { CreateMaterial_ubicacionUseCase }     from './application/use-cases/create-material_ubicacion.use-case';
import { FindAllMaterial_ubicacionUseCase }    from './application/use-cases/find-all-material_ubicacion.use-case';
import { FindOneMaterial_ubicacionUseCase }    from './application/use-cases/find-one-material_ubicacion.use-case';
import { UpdateMaterial_ubicacionUseCase }     from './application/use-cases/update-material_ubicacion.use-case';
import { RemoveMaterial_ubicacionUseCase }     from './application/use-cases/remove-material_ubicacion.use-case';

// Módulos relacionados
import { MaterialesModule }                    from 'src/materiales/materiales.module';
import { UbicacionModule }                     from 'src/ubicacion/ubicacion.module';

const USE_CASES = [
  CreateMaterial_ubicacionUseCase,
  FindAllMaterial_ubicacionUseCase,
  FindOneMaterial_ubicacionUseCase,
  UpdateMaterial_ubicacionUseCase,
  RemoveMaterial_ubicacionUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Material_ubicacionOrmEntity]),
    MaterialesModule,
    UbicacionModule,
  ],
  controllers: [Material_ubicacionController],
  providers: [
    ...USE_CASES,
    {
      provide:  Material_ubicacionRepository,
      useClass: TypeOrmMaterial_ubicacionRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class Material_ubicacionModule {}
