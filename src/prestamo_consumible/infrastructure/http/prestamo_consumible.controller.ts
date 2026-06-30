import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreatePrestamoConsumibleUseCase }         from '../../application/use-cases/create-prestamo_consumible.use-case';
import { FindAllPrestamoConsumibleUseCase }        from '../../application/use-cases/find-all-prestamo_consumible.use-case';
import { FindOnePrestamoConsumibleUseCase }        from '../../application/use-cases/find-one-prestamo_consumible.use-case';
import { FindByPrestamoPrestamoConsumibleUseCase } from '../../application/use-cases/find-by-prestamo-prestamo_consumible.use-case';
import { UpdatePrestamoConsumibleUseCase }         from '../../application/use-cases/update-prestamo_consumible.use-case';
import { RemovePrestamoConsumibleUseCase }         from '../../application/use-cases/remove-prestamo_consumible.use-case';
import { CreatePrestamoConsumibleDto }             from '../../application/dto/create-prestamo_consumible.dto';
import { UpdatePrestamoConsumibleDto }             from '../../application/dto/update-prestamo_consumible.dto';

@Controller('prestamo-consumible')
export class PrestamoConsumibleController {
  constructor(
    private readonly createUseCase:         CreatePrestamoConsumibleUseCase,
    private readonly findAllUseCase:        FindAllPrestamoConsumibleUseCase,
    private readonly findOneUseCase:        FindOnePrestamoConsumibleUseCase,
    private readonly findByPrestamoUseCase: FindByPrestamoPrestamoConsumibleUseCase,
    private readonly updateUseCase:         UpdatePrestamoConsumibleUseCase,
    private readonly removeUseCase:         RemovePrestamoConsumibleUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreatePrestamoConsumibleDto) { return this.createUseCase.execute(dto); }

  @Get()
  findAll() { return this.findAllUseCase.execute(); }

  @Get('prestamo/:prestamoId')
  findByPrestamo(@Param('prestamoId', ParseUUIDPipe) prestamoId: string) {
    return this.findByPrestamoUseCase.execute(prestamoId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.findOneUseCase.execute(id); }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePrestamoConsumibleDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.removeUseCase.execute(id); }
}
