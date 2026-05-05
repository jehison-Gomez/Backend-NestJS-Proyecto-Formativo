import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoOrmEntity } from './infrastructure/persistence/departamento.orm-entity';
import { TypeOrmDepartamentoRepository } from './infrastructure/persistence/typeorm-departamento.repository';
import { DepartamentoController } from './infrastructure/http/departamento.controller';
import { DepartamentoRepository } from './domain/departamento.repository';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoUseCase } from './application/use-cases/create-departamento.use-case';
import { FindAllDepartamentosUseCase } from './application/use-cases/find-all-departamentos.use-case';
import { FindOneDepartamentoUseCase } from './application/use-cases/find-one-departamento.use-case';
import { UpdateDepartamentoUseCase } from './application/use-cases/update-departamento.use-case';
import { RemoveDepartamentoUseCase } from './application/use-cases/remove-departamento.use-case';

const USE_CASES = [
  CreateDepartamentoUseCase,
  FindAllDepartamentosUseCase,
  FindOneDepartamentoUseCase,
  UpdateDepartamentoUseCase,
  RemoveDepartamentoUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([DepartamentoOrmEntity])],
  controllers: [DepartamentoController],
  providers: [
    DepartamentoService,
    ...USE_CASES,
    {
      provide: DepartamentoRepository,
      useClass: TypeOrmDepartamentoRepository,
    },
  ],
  exports: [DepartamentoService],
})
export class DepartamentoModule {}
