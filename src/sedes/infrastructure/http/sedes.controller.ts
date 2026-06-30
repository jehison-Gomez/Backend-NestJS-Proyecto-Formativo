import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateSedeUseCase }    from '../../application/use-cases/create-sede.use-case';
import { FindAllSedesUseCase }  from '../../application/use-cases/find-all-sedes.use-case';
import { FindOneSedeUseCase }   from '../../application/use-cases/find-one-sede.use-case';
import { UpdateSedeUseCase }    from '../../application/use-cases/update-sede.use-case';
import { RemoveSedeUseCase }    from '../../application/use-cases/remove-sede.use-case';
import { CreateSedeDto }        from '../../application/dto/create-sede.dto';
import { UpdateSedeDto }        from '../../application/dto/update-sede.dto';

@Controller('sedes')
export class SedesController {
  constructor(
    private readonly createSedeUseCase:   CreateSedeUseCase,
    private readonly findAllSedesUseCase: FindAllSedesUseCase,
    private readonly findOneSedeUseCase:  FindOneSedeUseCase,
    private readonly updateSedeUseCase:   UpdateSedeUseCase,
    private readonly removeSedeUseCase:   RemoveSedeUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateSedeDto) {
    return this.createSedeUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllSedesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneSedeUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateSedeDto) {
    return this.updateSedeUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeSedeUseCase.execute(id);
  }
}
