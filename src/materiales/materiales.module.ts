import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { MaterialeOrmEntity }               from './infrastructure/persistence/materiale.orm-entity';
import { TypeOrmMaterialeRepository }       from './infrastructure/persistence/typeorm-materiale.repository';
import { MaterialesController }             from './infrastructure/http/materiales.controller';

// Domain
import { MaterialeRepository }              from './domain/materiale.repository';

// Use Cases
import { CreateMaterialeUseCase }           from './application/use-cases/create-materiale.use-case';
import { FindAllMaterialesUseCase }         from './application/use-cases/find-all-materiales.use-case';
import { FindOneMaterialeUseCase }          from './application/use-cases/find-one-materiale.use-case';
import { UpdateMaterialeUseCase }           from './application/use-cases/update-materiale.use-case';
import { RemoveMaterialeUseCase }           from './application/use-cases/remove-materiale.use-case';
import { FindKardexMaterialeUseCase }       from './application/use-cases/find-kardex-materiale.use-case';

// Módulos relacionados
import { Categoria_materialModule }         from 'src/categoria_material/categoria_material.module';
import { FichasModule }                     from 'src/fichas/fichas.module';
import { UbicacionModule }                  from 'src/ubicacion/ubicacion.module';
import { AuthModule }                       from 'src/auth/auth.module';

const USE_CASES = [
  CreateMaterialeUseCase,
  FindAllMaterialesUseCase,
  FindOneMaterialeUseCase,
  UpdateMaterialeUseCase,
  RemoveMaterialeUseCase,
  FindKardexMaterialeUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialeOrmEntity]),
    Categoria_materialModule,
    FichasModule,
    UbicacionModule,
    AuthModule,
  ],
  controllers: [MaterialesController],
  providers: [
    ...USE_CASES,
    {
      provide:  MaterialeRepository,
      useClass: TypeOrmMaterialeRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class MaterialesModule {}
