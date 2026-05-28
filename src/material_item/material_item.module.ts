import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { Material_itemOrmEntity }               from './infrastructure/persistence/material_item.orm-entity';
import { TypeOrmMaterial_itemRepository }       from './infrastructure/persistence/typeorm-material_item.repository';
import { Material_itemController }                from './infrastructure/http/material_item.controller';

// Domain
import { Material_itemRepository }              from './domain/material_item.repository';

// Use Cases
import { CreateMaterial_itemUseCase }           from './application/use-cases/create-material_item.use-case';
import { FindAllMaterial_itemUseCase }         from './application/use-cases/find-all-material_item.use-case';
import { FindOneMaterial_itemUseCase }          from './application/use-cases/find-one-material_item.use-case';
import { UpdateMaterial_itemUseCase }           from './application/use-cases/update-material_item.use-case';
import { RemoveMaterial_itemUseCase }           from './application/use-cases/remove-material_item.use-case';

const USE_CASES = [
  CreateMaterial_itemUseCase,
  FindAllMaterial_itemUseCase,
  FindOneMaterial_itemUseCase,
  UpdateMaterial_itemUseCase,
  RemoveMaterial_itemUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([Material_itemOrmEntity])],
  controllers: [Material_itemController],
  providers: [
    ...USE_CASES,
    {
      provide:  Material_itemRepository,
      useClass: TypeOrmMaterial_itemRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class Material_itemModule {}
