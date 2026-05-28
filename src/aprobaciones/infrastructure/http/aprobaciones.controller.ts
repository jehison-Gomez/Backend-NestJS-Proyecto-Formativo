import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateAprobacioneUseCase }    from '../../application/use-cases/create-aprobacione.use-case';
import { FindAllAprobacionesUseCase }  from '../../application/use-cases/find-all-aprobaciones.use-case';
import { FindOneAprobacioneUseCase }   from '../../application/use-cases/find-one-aprobacione.use-case';
import { UpdateAprobacioneUseCase }    from '../../application/use-cases/update-aprobacione.use-case';
import { RemoveAprobacioneUseCase }    from '../../application/use-cases/remove-aprobacione.use-case';
import { CreateAprobacioneDto }        from '../../application/dto/create-aprobacione.dto';
import { UpdateAprobacioneDto }        from '../../application/dto/update-aprobacione.dto';

@Controller('aprobaciones')
export class AprobacionesController {
  constructor(
    private readonly createAprobacioneUseCase:   CreateAprobacioneUseCase,
    private readonly findAllAprobacionesUseCase: FindAllAprobacionesUseCase,
    private readonly findOneAprobacioneUseCase:  FindOneAprobacioneUseCase,
    private readonly updateAprobacioneUseCase:   UpdateAprobacioneUseCase,
    private readonly removeAprobacioneUseCase:   RemoveAprobacioneUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateAprobacioneDto) {
    return this.createAprobacioneUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllAprobacionesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneAprobacioneUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAprobacioneDto) {
    return this.updateAprobacioneUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeAprobacioneUseCase.execute(id);
  }
}
