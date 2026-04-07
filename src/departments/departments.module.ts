import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './infrastructure/http/departments.controller';
import { DepartmentOrmEntity } from './infrastructure/persistence/departamento.orm-entity';
import { TypeOrmDepartmentRepository } from './infrastructure/persistence/typeorm-departamento.repository';
import { DEPARTMENT_REPOSITORY } from './domain/departamento.repository';
import { CreateDepartamentoUseCase } from './application/use-cases/create-departamento.use-case';
import { FindAllDepartmentosUseCase } from './application/use-cases/find-all-departamentos.use-case';
import { FindOneDepartamentoUseCase } from './application/use-cases/find-one-departamento.use-case';
import { UpdateDepartamentoUseCase } from './application/use-cases/update-departamento.use-case';
import { RemoveDepartamentoUseCase } from './application/use-cases/remove-departamento.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentOrmEntity])],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    {
      provide: DEPARTMENT_REPOSITORY,
      useClass: TypeOrmDepartmentRepository,
    },
    CreateDepartamentoUseCase,
    FindAllDepartmentosUseCase,
    FindOneDepartamentoUseCase,
    UpdateDepartamentoUseCase,
    RemoveDepartamentoUseCase,
  ],
})
export class DepartmentsModule {}
