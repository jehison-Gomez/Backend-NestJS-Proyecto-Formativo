import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateCentroUseCase }    from '../../application/use-cases/create-centro.use-case';
import { FindAllCentrosUseCase }  from '../../application/use-cases/find-all-centros.use-case';
import { FindOneCentroUseCase }   from '../../application/use-cases/find-one-centro.use-case';
import { UpdateCentroUseCase }    from '../../application/use-cases/update-centro.use-case';
import { RemoveCentroUseCase }    from '../../application/use-cases/remove-centro.use-case';
import { CreateCentroDto }        from '../../application/dto/create-centro.dto';
import { UpdateCentroDto }        from '../../application/dto/update-centro.dto';

@Controller('centros')
export class CentrosController {
  constructor(
    private readonly createCentroUseCase:   CreateCentroUseCase,
    private readonly findAllCentrosUseCase: FindAllCentrosUseCase,
    private readonly findOneCentroUseCase:  FindOneCentroUseCase,
    private readonly updateCentroUseCase:   UpdateCentroUseCase,
    private readonly removeCentroUseCase:   RemoveCentroUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCentroDto) {
    return this.createCentroUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllCentrosUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneCentroUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCentroDto) {
    return this.updateCentroUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeCentroUseCase.execute(id);
  }
}
