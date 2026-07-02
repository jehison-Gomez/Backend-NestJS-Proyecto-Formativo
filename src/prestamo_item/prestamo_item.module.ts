import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material_itemModule } from 'src/material_item/material_item.module';

import { PrestamoItemOrmEntity }              from './infrastructure/persistence/prestamo_item.orm-entity';
import { TypeOrmPrestamoItemRepository }      from './infrastructure/persistence/typeorm-prestamo_item.repository';
import { PrestamoItemController }             from './infrastructure/http/prestamo_item.controller';
import { PrestamoItemRepository }             from './domain/prestamo_item.repository';
import { CreatePrestamoItemUseCase }          from './application/use-cases/create-prestamo_item.use-case';
import { FindAllPrestamoItemUseCase }         from './application/use-cases/find-all-prestamo_item.use-case';
import { FindOnePrestamoItemUseCase }         from './application/use-cases/find-one-prestamo_item.use-case';
import { FindByPrestamoPrestamoItemUseCase }  from './application/use-cases/find-by-prestamo-prestamo_item.use-case';
import { UpdatePrestamoItemUseCase }          from './application/use-cases/update-prestamo_item.use-case';
import { RemovePrestamoItemUseCase }          from './application/use-cases/remove-prestamo_item.use-case';

const USE_CASES = [
  CreatePrestamoItemUseCase,
  FindAllPrestamoItemUseCase,
  FindOnePrestamoItemUseCase,
  FindByPrestamoPrestamoItemUseCase,
  UpdatePrestamoItemUseCase,
  RemovePrestamoItemUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([PrestamoItemOrmEntity]), Material_itemModule],
  controllers: [PrestamoItemController],
  providers: [
    ...USE_CASES,
    { provide: PrestamoItemRepository, useClass: TypeOrmPrestamoItemRepository },
  ],
  exports: [...USE_CASES, PrestamoItemRepository],
})
export class PrestamoItemModule {}
