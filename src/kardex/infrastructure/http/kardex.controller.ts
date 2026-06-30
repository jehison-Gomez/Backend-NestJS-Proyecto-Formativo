import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateKardexUseCase }  from '../../application/use-cases/create-kardex.use-case';
import { FindAllKardexUseCase } from '../../application/use-cases/find-all-kardex.use-case';
import { FindOneKardexUseCase } from '../../application/use-cases/find-one-kardex.use-case';
import { CreateKardexDto }      from '../../application/dto/create-kardex.dto';

@Controller('kardex')
export class KardexController {
  constructor(
    private readonly createUseCase:  CreateKardexUseCase,
    private readonly findAllUseCase: FindAllKardexUseCase,
    private readonly findOneUseCase: FindOneKardexUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateKardexDto) { return this.createUseCase.execute(dto); }

  @Get()
  findAll() { return this.findAllUseCase.execute(); }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.findOneUseCase.execute(id); }
}
