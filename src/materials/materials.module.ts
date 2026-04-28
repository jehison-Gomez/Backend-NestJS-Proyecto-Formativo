import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './infrastructure/http/materials.controller';
import { MaterialOrmEntity } from './infrastructure/persistence/material.orm-entity';
import { TypeOrmMaterialRepository } from './infrastructure/persistence/typeorm-material.repository';
import { MATERIAL_REPOSITORY } from './domain/material.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialOrmEntity])],
  controllers: [MaterialsController],
  providers: [
    MaterialsService,
    {
      provide: MATERIAL_REPOSITORY,
      useClass: TypeOrmMaterialRepository,
    },
  ],
  exports: [MATERIAL_REPOSITORY],
})
export class MaterialsModule {}
