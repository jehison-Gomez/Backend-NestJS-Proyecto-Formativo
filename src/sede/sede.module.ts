import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SedeOrmEntity } from './infrastructure/persistence/sede.orm-entity';
import { TypeOrmSedeRepository } from './infrastructure/persistence/typeorm-sede.repository';
import { SedeController } from './infrastructure/http/sede.controller';
import { SedeRepository } from './domain/sede.repository';
import { SedeService } from './sede.service';
import { CreateSedeUseCase } from './application/use-cases/create-sede.use-case';
import { FindAllSedesUseCase } from './application/use-cases/find-all-sedes.use-case';
import { FindOneSedeUseCase } from './application/use-cases/find-one-sede.use-case';
import { UpdateSedeUseCase } from './application/use-cases/update-sede.use-case';
import { RemoveSedeUseCase } from './application/use-cases/remove-sede.use-case';

const USE_CASES = [
  CreateSedeUseCase,
  FindAllSedesUseCase,
  FindOneSedeUseCase,
  UpdateSedeUseCase,
  RemoveSedeUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([SedeOrmEntity])],
  controllers: [SedeController],
  providers: [
    SedeService,
    ...USE_CASES,
    {
      provide: SedeRepository,
      useClass: TypeOrmSedeRepository,
    },
  ],
  exports: [SedeService],
})
export class SedeModule {}
