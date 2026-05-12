import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateProgramaUseCase }    from '../../application/use-cases/create-programa.use-case';
import { FindAllProgramasUseCase }  from '../../application/use-cases/find-all-programas.use-case';
import { FindOneProgramaUseCase }   from '../../application/use-cases/find-one-programa.use-case';
import { UpdateProgramaUseCase }    from '../../application/use-cases/update-programa.use-case';
import { RemoveProgramaUseCase }    from '../../application/use-cases/remove-programa.use-case';
import { CreateProgramaDto }        from '../../application/dto/create-programa.dto';
import { UpdateProgramaDto }        from '../../application/dto/update-programa.dto';

@Controller('programas')
export class ProgramasController {
  constructor(
    private readonly createProgramaUseCase:   CreateProgramaUseCase,
    private readonly findAllProgramasUseCase: FindAllProgramasUseCase,
    private readonly findOneProgramaUseCase:  FindOneProgramaUseCase,
    private readonly updateProgramaUseCase:   UpdateProgramaUseCase,
    private readonly removeProgramaUseCase:   RemoveProgramaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProgramaDto) {
    return this.createProgramaUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllProgramasUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneProgramaUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProgramaDto) {
    return this.updateProgramaUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeProgramaUseCase.execute(id);
  }
}
