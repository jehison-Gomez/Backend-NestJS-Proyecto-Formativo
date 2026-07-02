import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material_consumibleModule } from 'src/material_consumible/material_consumible.module';

import { PrestamoConsumibleOrmEntity }              from './infrastructure/persistence/prestamo_consumible.orm-entity';
import { TypeOrmPrestamoConsumibleRepository }      from './infrastructure/persistence/typeorm-prestamo_consumible.repository';
import { PrestamoConsumibleController }             from './infrastructure/http/prestamo_consumible.controller';
import { PrestamoConsumibleRepository }             from './domain/prestamo_consumible.repository';
import { CreatePrestamoConsumibleUseCase }          from './application/use-cases/create-prestamo_consumible.use-case';
import { FindAllPrestamoConsumibleUseCase }         from './application/use-cases/find-all-prestamo_consumible.use-case';
import { FindOnePrestamoConsumibleUseCase }         from './application/use-cases/find-one-prestamo_consumible.use-case';
import { FindByPrestamoPrestamoConsumibleUseCase }  from './application/use-cases/find-by-prestamo-prestamo_consumible.use-case';
import { UpdatePrestamoConsumibleUseCase }          from './application/use-cases/update-prestamo_consumible.use-case';
import { RemovePrestamoConsumibleUseCase }          from './application/use-cases/remove-prestamo_consumible.use-case';

const USE_CASES = [
  CreatePrestamoConsumibleUseCase,
  FindAllPrestamoConsumibleUseCase,
  FindOnePrestamoConsumibleUseCase,
  FindByPrestamoPrestamoConsumibleUseCase,
  UpdatePrestamoConsumibleUseCase,
  RemovePrestamoConsumibleUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([PrestamoConsumibleOrmEntity]), forwardRef(() => Material_consumibleModule)],
  controllers: [PrestamoConsumibleController],
  providers: [
    ...USE_CASES,
    { provide: PrestamoConsumibleRepository, useClass: TypeOrmPrestamoConsumibleRepository },
  ],
  exports: [...USE_CASES, PrestamoConsumibleRepository],
})
export class PrestamoConsumibleModule {}
