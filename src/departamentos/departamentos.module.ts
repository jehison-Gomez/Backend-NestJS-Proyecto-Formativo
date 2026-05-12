import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { DepartamentoOrmEntity }               from './infrastructure/persistence/departamento.orm-entity';
import { TypeOrmDepartamentoRepository }       from './infrastructure/persistence/typeorm-departamento.repository';
import { DepartamentosController }                from './infrastructure/http/departamentos.controller';

// Domain
import { DepartamentoRepository }              from './domain/departamento.repository';

// Use Cases
import { CreateDepartamentoUseCase }           from './application/use-cases/create-departamento.use-case';
import { FindAllDepartamentosUseCase }         from './application/use-cases/find-all-departamentos.use-case';
import { FindOneDepartamentoUseCase }          from './application/use-cases/find-one-departamento.use-case';
import { UpdateDepartamentoUseCase }           from './application/use-cases/update-departamento.use-case';
import { RemoveDepartamentoUseCase }           from './application/use-cases/remove-departamento.use-case';

const USE_CASES = [
  CreateDepartamentoUseCase,
  FindAllDepartamentosUseCase,
  FindOneDepartamentoUseCase,
  UpdateDepartamentoUseCase,
  RemoveDepartamentoUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([DepartamentoOrmEntity])],
  controllers: [DepartamentosController],
  providers: [
    ...USE_CASES,
    {
      provide:  DepartamentoRepository,
      useClass: TypeOrmDepartamentoRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class DepartamentosModule {}
