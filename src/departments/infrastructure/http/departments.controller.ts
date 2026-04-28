import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateDepartmentDto } from 'src/departments/application/dto/create-department.dto';
import { UpdateDepartmentDto } from 'src/departments/application/dto/update-department.dto';
import { CreateDepartamentoUseCase } from 'src/departments/application/use-cases/create-departamento.use-case';
import { FindAllDepartmentosUseCase } from 'src/departments/application/use-cases/find-all-departamentos.use-case';
import { FindOneDepartamentoUseCase } from 'src/departments/application/use-cases/find-one-departamento.use-case';
import { UpdateDepartamentoUseCase } from 'src/departments/application/use-cases/update-departamento.use-case';
import { RemoveDepartamentoUseCase } from 'src/departments/application/use-cases/remove-departamento.use-case';

@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly createDepartment: CreateDepartamentoUseCase,
    private readonly findAllDepartments: FindAllDepartmentosUseCase,
    private readonly findOneDepartment: FindOneDepartamentoUseCase,
    private readonly updateDepartment: UpdateDepartamentoUseCase,
    private readonly removeDepartment: RemoveDepartamentoUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateDepartmentDto) {
    return this.createDepartment.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllDepartments.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneDepartment.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDepartmentDto,
  ) {
    return this.updateDepartment.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeDepartment.execute(id);
  }
}
