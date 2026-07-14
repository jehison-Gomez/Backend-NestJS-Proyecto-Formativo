import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrestamoHistorialOrmEntity }              from './infrastructure/persistence/prestamo_historial.orm-entity';
import { TypeOrmPrestamoHistorialRepository }      from './infrastructure/persistence/typeorm-prestamo_historial.repository';
import { PrestamoHistorialRepository }             from './domain/prestamo_historial.repository';
import { CreatePrestamoHistorialUseCase }          from './application/use-cases/create-prestamo_historial.use-case';
import { FindByPrestamoPrestamoHistorialUseCase }  from './application/use-cases/find-by-prestamo-prestamo_historial.use-case';

const USE_CASES = [
  CreatePrestamoHistorialUseCase,
  FindByPrestamoPrestamoHistorialUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([PrestamoHistorialOrmEntity])],
  providers: [
    ...USE_CASES,
    { provide: PrestamoHistorialRepository, useClass: TypeOrmPrestamoHistorialRepository },
  ],
  exports: [...USE_CASES],
})
export class PrestamoHistorialModule {}
