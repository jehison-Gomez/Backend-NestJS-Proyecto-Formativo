import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreatePrestamoItemUseCase }          from '../../application/use-cases/create-prestamo_item.use-case';
import { FindAllPrestamoItemUseCase }         from '../../application/use-cases/find-all-prestamo_item.use-case';
import { FindOnePrestamoItemUseCase }         from '../../application/use-cases/find-one-prestamo_item.use-case';
import { FindByPrestamoPrestamoItemUseCase }  from '../../application/use-cases/find-by-prestamo-prestamo_item.use-case';
import { UpdatePrestamoItemUseCase }          from '../../application/use-cases/update-prestamo_item.use-case';
import { RemovePrestamoItemUseCase }          from '../../application/use-cases/remove-prestamo_item.use-case';
import { CreatePrestamoItemDto }              from '../../application/dto/create-prestamo_item.dto';
import { UpdatePrestamoItemDto }              from '../../application/dto/update-prestamo_item.dto';

@Controller('prestamo-item')
export class PrestamoItemController {
  constructor(
    private readonly createUseCase:         CreatePrestamoItemUseCase,
    private readonly findAllUseCase:        FindAllPrestamoItemUseCase,
    private readonly findOneUseCase:        FindOnePrestamoItemUseCase,
    private readonly findByPrestamoUseCase: FindByPrestamoPrestamoItemUseCase,
    private readonly updateUseCase:         UpdatePrestamoItemUseCase,
    private readonly removeUseCase:         RemovePrestamoItemUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreatePrestamoItemDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllUseCase.execute();
  }

  @Get('prestamo/:prestamoId')
  findByPrestamo(@Param('prestamoId', ParseUUIDPipe) prestamoId: string) {
    return this.findByPrestamoUseCase.execute(prestamoId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePrestamoItemDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUseCase.execute(id);
  }
}
