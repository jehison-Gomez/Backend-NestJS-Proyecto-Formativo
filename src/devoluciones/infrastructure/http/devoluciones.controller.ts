import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateDevolucioneUseCase }    from '../../application/use-cases/create-devolucione.use-case';
import { FindAllDevolucionesUseCase }  from '../../application/use-cases/find-all-devoluciones.use-case';
import { FindOneDevolucioneUseCase }   from '../../application/use-cases/find-one-devolucione.use-case';
import { UpdateDevolucioneUseCase }    from '../../application/use-cases/update-devolucione.use-case';
import { RemoveDevolucioneUseCase }    from '../../application/use-cases/remove-devolucione.use-case';
import { CreateDevolucioneDto }        from '../../application/dto/create-devolucione.dto';
import { UpdateDevolucioneDto }        from '../../application/dto/update-devolucione.dto';

@Controller('devoluciones')
export class DevolucionesController {
  constructor(
    private readonly createDevolucioneUseCase:   CreateDevolucioneUseCase,
    private readonly findAllDevolucionesUseCase: FindAllDevolucionesUseCase,
    private readonly findOneDevolucioneUseCase:  FindOneDevolucioneUseCase,
    private readonly updateDevolucioneUseCase:   UpdateDevolucioneUseCase,
    private readonly removeDevolucioneUseCase:   RemoveDevolucioneUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateDevolucioneDto) {
    return this.createDevolucioneUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllDevolucionesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneDevolucioneUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDevolucioneDto) {
    return this.updateDevolucioneUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeDevolucioneUseCase.execute(id);
  }
}
