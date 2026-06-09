import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KardexOrmEntity }              from './infrastructure/persistence/kardex.orm-entity';
import { TypeOrmKardexRepository }      from './infrastructure/persistence/typeorm-kardex.repository';
import { KardexController }             from './infrastructure/http/kardex.controller';
import { KardexRepository }             from './domain/kardex.repository';
import { CreateKardexUseCase }          from './application/use-cases/create-kardex.use-case';
import { FindAllKardexUseCase }         from './application/use-cases/find-all-kardex.use-case';
import { FindOneKardexUseCase }         from './application/use-cases/find-one-kardex.use-case';

const USE_CASES = [
  CreateKardexUseCase,
  FindAllKardexUseCase,
  FindOneKardexUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([KardexOrmEntity])],
  controllers: [KardexController],
  providers: [
    ...USE_CASES,
    { provide: KardexRepository, useClass: TypeOrmKardexRepository },
  ],
  exports: [...USE_CASES, KardexRepository],
})
export class KardexModule {}
