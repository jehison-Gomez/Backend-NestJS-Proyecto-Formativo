import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreatePrestamoUseCase }    from '../../application/use-cases/create-prestamo.use-case';
import { FindAllPrestamosUseCase }  from '../../application/use-cases/find-all-prestamos.use-case';
import { FindOnePrestamoUseCase }   from '../../application/use-cases/find-one-prestamo.use-case';
import { UpdatePrestamoUseCase }    from '../../application/use-cases/update-prestamo.use-case';
import { RemovePrestamoUseCase }    from '../../application/use-cases/remove-prestamo.use-case';
import { CreatePrestamoDto }        from '../../application/dto/create-prestamo.dto';
import { UpdatePrestamoDto }        from '../../application/dto/update-prestamo.dto';

@Controller('prestamos')
export class PrestamosController {
  constructor(
    private readonly createPrestamoUseCase:   CreatePrestamoUseCase,
    private readonly findAllPrestamosUseCase: FindAllPrestamosUseCase,
    private readonly findOnePrestamoUseCase:  FindOnePrestamoUseCase,
    private readonly updatePrestamoUseCase:   UpdatePrestamoUseCase,
    private readonly removePrestamoUseCase:   RemovePrestamoUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreatePrestamoDto) {
    return this.createPrestamoUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllPrestamosUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOnePrestamoUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePrestamoDto) {
    return this.updatePrestamoUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removePrestamoUseCase.execute(id);
  }
}
