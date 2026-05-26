import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateTipo_ubicacionUseCase }    from '../../application/use-cases/create-tipo_ubicacion.use-case';
import { FindAllTipo_ubicacionUseCase }  from '../../application/use-cases/find-all-tipo_ubicacion.use-case';
import { FindOneTipo_ubicacionUseCase }   from '../../application/use-cases/find-one-tipo_ubicacion.use-case';
import { UpdateTipo_ubicacionUseCase }    from '../../application/use-cases/update-tipo_ubicacion.use-case';
import { RemoveTipo_ubicacionUseCase }    from '../../application/use-cases/remove-tipo_ubicacion.use-case';
import { CreateTipo_ubicacionDto }        from '../../application/dto/create-tipo_ubicacion.dto';
import { UpdateTipo_ubicacionDto }        from '../../application/dto/update-tipo_ubicacion.dto';

@Controller('tipo_ubicacion')
export class Tipo_ubicacionController {
  constructor(
    private readonly createTipo_ubicacionUseCase:   CreateTipo_ubicacionUseCase,
    private readonly findAllTipo_ubicacionUseCase: FindAllTipo_ubicacionUseCase,
    private readonly findOneTipo_ubicacionUseCase:  FindOneTipo_ubicacionUseCase,
    private readonly updateTipo_ubicacionUseCase:   UpdateTipo_ubicacionUseCase,
    private readonly removeTipo_ubicacionUseCase:   RemoveTipo_ubicacionUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTipo_ubicacionDto) {
    return this.createTipo_ubicacionUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllTipo_ubicacionUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneTipo_ubicacionUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTipo_ubicacionDto) {
    return this.updateTipo_ubicacionUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeTipo_ubicacionUseCase.execute(id);
  }
}
