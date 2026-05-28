import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateKardexUseCase }    from '../../application/use-cases/create-kardex.use-case';
import { FindAllKardexUseCase }  from '../../application/use-cases/find-all-kardex.use-case';
import { FindOneKardexUseCase }   from '../../application/use-cases/find-one-kardex.use-case';
import { UpdateKardexUseCase }    from '../../application/use-cases/update-kardex.use-case';
import { RemoveKardexUseCase }    from '../../application/use-cases/remove-kardex.use-case';
import { CreateKardexDto }        from '../../application/dto/create-kardex.dto';
import { UpdateKardexDto }        from '../../application/dto/update-kardex.dto';

@Controller('kardex')
export class KardexController {
  constructor(
    private readonly createKardexUseCase:   CreateKardexUseCase,
    private readonly findAllKardexUseCase: FindAllKardexUseCase,
    private readonly findOneKardexUseCase:  FindOneKardexUseCase,
    private readonly updateKardexUseCase:   UpdateKardexUseCase,
    private readonly removeKardexUseCase:   RemoveKardexUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateKardexDto) {
    return this.createKardexUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllKardexUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneKardexUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateKardexDto) {
    return this.updateKardexUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeKardexUseCase.execute(id);
  }
}
