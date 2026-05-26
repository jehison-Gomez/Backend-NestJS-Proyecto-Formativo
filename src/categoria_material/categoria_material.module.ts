import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { Categoria_materialOrmEntity }               from './infrastructure/persistence/categoria_material.orm-entity';
import { TypeOrmCategoria_materialRepository }       from './infrastructure/persistence/typeorm-categoria_material.repository';
import { Categoria_materialController }                from './infrastructure/http/categoria_material.controller';

// Domain
import { Categoria_materialRepository }              from './domain/categoria_material.repository';

// Use Cases
import { CreateCategoria_materialUseCase }           from './application/use-cases/create-categoria_material.use-case';
import { FindAllCategoria_materialUseCase }         from './application/use-cases/find-all-categoria_material.use-case';
import { FindOneCategoria_materialUseCase }          from './application/use-cases/find-one-categoria_material.use-case';
import { UpdateCategoria_materialUseCase }           from './application/use-cases/update-categoria_material.use-case';
import { RemoveCategoria_materialUseCase }           from './application/use-cases/remove-categoria_material.use-case';

const USE_CASES = [
  CreateCategoria_materialUseCase,
  FindAllCategoria_materialUseCase,
  FindOneCategoria_materialUseCase,
  UpdateCategoria_materialUseCase,
  RemoveCategoria_materialUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([Categoria_materialOrmEntity])],
  controllers: [Categoria_materialController],
  providers: [
    ...USE_CASES,
    {
      provide:  Categoria_materialRepository,
      useClass: TypeOrmCategoria_materialRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class Categoria_materialModule {}
