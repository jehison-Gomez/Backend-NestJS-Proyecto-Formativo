import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreatePrestamoUseCase }    from '../../application/use-cases/create-prestamo.use-case';
import { FindAllPrestamosUseCase }  from '../../application/use-cases/find-all-prestamos.use-case';
import { FindOnePrestamoUseCase }   from '../../application/use-cases/find-one-prestamo.use-case';
import { UpdatePrestamoUseCase }    from '../../application/use-cases/update-prestamo.use-case';
import { RemovePrestamoUseCase }    from '../../application/use-cases/remove-prestamo.use-case';
import { ApprovePrestamoUseCase }   from '../../application/use-cases/approve-prestamo.use-case';
import { RejectPrestamoUseCase }    from '../../application/use-cases/reject-prestamo.use-case';
import { DeliverPrestamoUseCase }   from '../../application/use-cases/deliver-prestamo.use-case';
import { ReturnPrestamoUseCase }    from '../../application/use-cases/return-prestamo.use-case';
import { CreatePrestamoDto }        from '../../application/dto/create-prestamo.dto';
import { UpdatePrestamoDto }        from '../../application/dto/update-prestamo.dto';
import { ApprovePrestamoDto }       from '../../application/dto/approve-prestamo.dto';
import { RejectPrestamoDto }        from '../../application/dto/reject-prestamo.dto';

@Controller('prestamos')
export class PrestamosController {
  constructor(
    private readonly createPrestamoUseCase:   CreatePrestamoUseCase,
    private readonly findAllPrestamosUseCase: FindAllPrestamosUseCase,
    private readonly findOnePrestamoUseCase:  FindOnePrestamoUseCase,
    private readonly updatePrestamoUseCase:   UpdatePrestamoUseCase,
    private readonly removePrestamoUseCase:   RemovePrestamoUseCase,
    private readonly approvePrestamoUseCase:  ApprovePrestamoUseCase,
    private readonly rejectPrestamoUseCase:   RejectPrestamoUseCase,
    private readonly deliverPrestamoUseCase:  DeliverPrestamoUseCase,
    private readonly returnPrestamoUseCase:   ReturnPrestamoUseCase,
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

  @Post(':id/aprobar')
  approve(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ApprovePrestamoDto) {
    return this.approvePrestamoUseCase.execute(id, dto);
  }

  @Post(':id/rechazar')
  reject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: RejectPrestamoDto) {
    return this.rejectPrestamoUseCase.execute(id, dto);
  }

  @Post(':id/entregar')
  deliver(@Param('id', ParseUUIDPipe) id: string) {
    return this.deliverPrestamoUseCase.execute(id);
  }

  @Post(':id/devolver')
  return(@Param('id', ParseUUIDPipe) id: string) {
    return this.returnPrestamoUseCase.execute(id);
  }
}
