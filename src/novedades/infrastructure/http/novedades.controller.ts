import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateNovedadeUseCase }    from '../../application/use-cases/create-novedade.use-case';
import { FindAllNovedadesUseCase }  from '../../application/use-cases/find-all-novedades.use-case';
import { FindOneNovedadeUseCase }   from '../../application/use-cases/find-one-novedade.use-case';
import { UpdateNovedadeUseCase }    from '../../application/use-cases/update-novedade.use-case';
import { RemoveNovedadeUseCase }    from '../../application/use-cases/remove-novedade.use-case';
import { CreateNovedadeDto }        from '../../application/dto/create-novedade.dto';
import { UpdateNovedadeDto }        from '../../application/dto/update-novedade.dto';

@Controller('novedades')
export class NovedadesController {
  constructor(
    private readonly createNovedadeUseCase:   CreateNovedadeUseCase,
    private readonly findAllNovedadesUseCase: FindAllNovedadesUseCase,
    private readonly findOneNovedadeUseCase:  FindOneNovedadeUseCase,
    private readonly updateNovedadeUseCase:   UpdateNovedadeUseCase,
    private readonly removeNovedadeUseCase:   RemoveNovedadeUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateNovedadeDto) {
    return this.createNovedadeUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllNovedadesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneNovedadeUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateNovedadeDto) {
    return this.updateNovedadeUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeNovedadeUseCase.execute(id);
  }
}
