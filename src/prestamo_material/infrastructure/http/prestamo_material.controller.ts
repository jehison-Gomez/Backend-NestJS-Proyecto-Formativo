import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreatePrestamo_materialUseCase }    from '../../application/use-cases/create-prestamo_material.use-case';
import { FindAllPrestamo_materialUseCase }  from '../../application/use-cases/find-all-prestamo_material.use-case';
import { FindOnePrestamo_materialUseCase }   from '../../application/use-cases/find-one-prestamo_material.use-case';
import { UpdatePrestamo_materialUseCase }    from '../../application/use-cases/update-prestamo_material.use-case';
import { RemovePrestamo_materialUseCase }    from '../../application/use-cases/remove-prestamo_material.use-case';
import { CreatePrestamo_materialDto }        from '../../application/dto/create-prestamo_material.dto';
import { UpdatePrestamo_materialDto }        from '../../application/dto/update-prestamo_material.dto';

@Controller('prestamo_material')
export class Prestamo_materialController {
  constructor(
    private readonly createPrestamo_materialUseCase:   CreatePrestamo_materialUseCase,
    private readonly findAllPrestamo_materialUseCase: FindAllPrestamo_materialUseCase,
    private readonly findOnePrestamo_materialUseCase:  FindOnePrestamo_materialUseCase,
    private readonly updatePrestamo_materialUseCase:   UpdatePrestamo_materialUseCase,
    private readonly removePrestamo_materialUseCase:   RemovePrestamo_materialUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreatePrestamo_materialDto) {
    return this.createPrestamo_materialUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllPrestamo_materialUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOnePrestamo_materialUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePrestamo_materialDto) {
    return this.updatePrestamo_materialUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removePrestamo_materialUseCase.execute(id);
  }
}
