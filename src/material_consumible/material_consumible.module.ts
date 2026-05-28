import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { Material_consumibleOrmEntity }               from './infrastructure/persistence/material_consumible.orm-entity';
import { TypeOrmMaterial_consumibleRepository }       from './infrastructure/persistence/typeorm-material_consumible.repository';
import { Material_consumibleController }                from './infrastructure/http/material_consumible.controller';

// Domain
import { Material_consumibleRepository }              from './domain/material_consumible.repository';

// Use Cases
import { CreateMaterial_consumibleUseCase }           from './application/use-cases/create-material_consumible.use-case';
import { FindAllMaterial_consumibleUseCase }         from './application/use-cases/find-all-material_consumible.use-case';
import { FindOneMaterial_consumibleUseCase }          from './application/use-cases/find-one-material_consumible.use-case';
import { UpdateMaterial_consumibleUseCase }           from './application/use-cases/update-material_consumible.use-case';
import { RemoveMaterial_consumibleUseCase }           from './application/use-cases/remove-material_consumible.use-case';

const USE_CASES = [
  CreateMaterial_consumibleUseCase,
  FindAllMaterial_consumibleUseCase,
  FindOneMaterial_consumibleUseCase,
  UpdateMaterial_consumibleUseCase,
  RemoveMaterial_consumibleUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([Material_consumibleOrmEntity])],
  controllers: [Material_consumibleController],
  providers: [
    ...USE_CASES,
    {
      provide:  Material_consumibleRepository,
      useClass: TypeOrmMaterial_consumibleRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class Material_consumibleModule {}
