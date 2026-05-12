import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateDepartamentoUseCase }    from '../../application/use-cases/create-departamento.use-case';
import { FindAllDepartamentosUseCase }  from '../../application/use-cases/find-all-departamentos.use-case';
import { FindOneDepartamentoUseCase }   from '../../application/use-cases/find-one-departamento.use-case';
import { UpdateDepartamentoUseCase }    from '../../application/use-cases/update-departamento.use-case';
import { RemoveDepartamentoUseCase }    from '../../application/use-cases/remove-departamento.use-case';
import { CreateDepartamentoDto }        from '../../application/dto/create-departamento.dto';
import { UpdateDepartamentoDto }        from '../../application/dto/update-departamento.dto';

@Controller('departamentos')
export class DepartamentosController {
  constructor(
    private readonly createDepartamentoUseCase:   CreateDepartamentoUseCase,
    private readonly findAllDepartamentosUseCase: FindAllDepartamentosUseCase,
    private readonly findOneDepartamentoUseCase:  FindOneDepartamentoUseCase,
    private readonly updateDepartamentoUseCase:   UpdateDepartamentoUseCase,
    private readonly removeDepartamentoUseCase:   RemoveDepartamentoUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateDepartamentoDto) {
    return this.createDepartamentoUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllDepartamentosUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneDepartamentoUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDepartamentoDto) {
    return this.updateDepartamentoUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeDepartamentoUseCase.execute(id);
  }
}
