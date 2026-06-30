import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateDevolucionItemUseCase }  from '../../application/use-cases/create-devolucion_item.use-case';
import { FindAllDevolucionItemUseCase } from '../../application/use-cases/find-all-devolucion_item.use-case';
import { FindOneDevolucionItemUseCase } from '../../application/use-cases/find-one-devolucion_item.use-case';
import { UpdateDevolucionItemUseCase }  from '../../application/use-cases/update-devolucion_item.use-case';
import { RemoveDevolucionItemUseCase }  from '../../application/use-cases/remove-devolucion_item.use-case';
import { CreateDevolucionItemDto }      from '../../application/dto/create-devolucion_item.dto';
import { UpdateDevolucionItemDto }      from '../../application/dto/update-devolucion_item.dto';

@Controller('devolucion-item')
export class DevolucionItemController {
  constructor(
    private readonly createUseCase:  CreateDevolucionItemUseCase,
    private readonly findAllUseCase: FindAllDevolucionItemUseCase,
    private readonly findOneUseCase: FindOneDevolucionItemUseCase,
    private readonly updateUseCase:  UpdateDevolucionItemUseCase,
    private readonly removeUseCase:  RemoveDevolucionItemUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateDevolucionItemDto) { return this.createUseCase.execute(dto); }

  @Get()
  findAll() { return this.findAllUseCase.execute(); }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.findOneUseCase.execute(id); }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDevolucionItemDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.removeUseCase.execute(id); }
}
