import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/infrastructure/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { CreateMovimientoUseCase }    from '../../application/use-cases/create-movimiento.use-case';
import { FindAllMovimientosUseCase }  from '../../application/use-cases/find-all-movimientos.use-case';
import { FindOneMovimientoUseCase }   from '../../application/use-cases/find-one-movimiento.use-case';
import { UpdateMovimientoUseCase }    from '../../application/use-cases/update-movimiento.use-case';
import { RemoveMovimientoUseCase }    from '../../application/use-cases/remove-movimiento.use-case';
import { CreateMovimientoDto }        from '../../application/dto/create-movimiento.dto';
import { UpdateMovimientoDto }        from '../../application/dto/update-movimiento.dto';

@UseGuards(JwtAuthGuard)
@Controller('movimientos')
export class MovimientosController {
  constructor(
    private readonly createMovimientoUseCase:   CreateMovimientoUseCase,
    private readonly findAllMovimientosUseCase: FindAllMovimientosUseCase,
    private readonly findOneMovimientoUseCase:  FindOneMovimientoUseCase,
    private readonly updateMovimientoUseCase:   UpdateMovimientoUseCase,
    private readonly removeMovimientoUseCase:   RemoveMovimientoUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateMovimientoDto) {
    return this.createMovimientoUseCase.execute(dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    const sedeId = user.rol === 'super_admin' ? undefined : user.sedeId;
    return this.findAllMovimientosUseCase.execute(sedeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneMovimientoUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMovimientoDto) {
    return this.updateMovimientoUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeMovimientoUseCase.execute(id);
  }
}
