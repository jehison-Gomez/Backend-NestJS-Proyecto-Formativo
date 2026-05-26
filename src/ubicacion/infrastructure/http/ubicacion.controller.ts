import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateUbicacionUseCase }    from '../../application/use-cases/create-ubicacion.use-case';
import { FindAllUbicacionUseCase }  from '../../application/use-cases/find-all-ubicacion.use-case';
import { FindOneUbicacionUseCase }   from '../../application/use-cases/find-one-ubicacion.use-case';
import { UpdateUbicacionUseCase }    from '../../application/use-cases/update-ubicacion.use-case';
import { RemoveUbicacionUseCase }    from '../../application/use-cases/remove-ubicacion.use-case';
import { CreateUbicacionDto }        from '../../application/dto/create-ubicacion.dto';
import { UpdateUbicacionDto }        from '../../application/dto/update-ubicacion.dto';

@Controller('ubicacion')
export class UbicacionController {
  constructor(
    private readonly createUbicacionUseCase:   CreateUbicacionUseCase,
    private readonly findAllUbicacionUseCase: FindAllUbicacionUseCase,
    private readonly findOneUbicacionUseCase:  FindOneUbicacionUseCase,
    private readonly updateUbicacionUseCase:   UpdateUbicacionUseCase,
    private readonly removeUbicacionUseCase:   RemoveUbicacionUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateUbicacionDto) {
    return this.createUbicacionUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllUbicacionUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneUbicacionUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUbicacionDto) {
    return this.updateUbicacionUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUbicacionUseCase.execute(id);
  }
}
