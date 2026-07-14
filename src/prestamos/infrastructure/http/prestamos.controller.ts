import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/infrastructure/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { CreatePrestamoUseCase }              from '../../application/use-cases/create-prestamo.use-case';
import { FindAllPrestamosUseCase }            from '../../application/use-cases/find-all-prestamos.use-case';
import { FindOnePrestamoUseCase }             from '../../application/use-cases/find-one-prestamo.use-case';
import { FindByUsuarioPrestamoUseCase }       from '../../application/use-cases/find-by-usuario-prestamo.use-case';
import { UpdatePrestamoUseCase }              from '../../application/use-cases/update-prestamo.use-case';
import { RemovePrestamoUseCase }              from '../../application/use-cases/remove-prestamo.use-case';
import { ApprovePrestamoUseCase }             from '../../application/use-cases/approve-prestamo.use-case';
import { RejectPrestamoUseCase }              from '../../application/use-cases/reject-prestamo.use-case';
import { DeliverPrestamoUseCase }             from '../../application/use-cases/deliver-prestamo.use-case';
import { ReturnPrestamoUseCase }              from '../../application/use-cases/return-prestamo.use-case';
import { CambiarUbicacionMaterialUseCase }        from '../../application/use-cases/cambiar-ubicacion-material.use-case';
import { FindByPrestamoPrestamoHistorialUseCase } from 'src/prestamo_historial/application/use-cases/find-by-prestamo-prestamo_historial.use-case';
import { CheckVencidosPrestamosUseCase }          from '../../application/use-cases/check-vencidos-prestamos.use-case';
import { FindPorBodegaUseCase }                   from '../../application/use-cases/find-por-bodega.use-case';
import { CreatePrestamoDto }                      from '../../application/dto/create-prestamo.dto';
import { UpdatePrestamoDto }                  from '../../application/dto/update-prestamo.dto';
import { ApprovePrestamoDto }                 from '../../application/dto/approve-prestamo.dto';
import { RejectPrestamoDto }                  from '../../application/dto/reject-prestamo.dto';
import { CambiarUbicacionMaterialDto }        from '../../application/dto/cambiar-ubicacion-material.dto';

@UseGuards(JwtAuthGuard)
@Controller('prestamos')
export class PrestamosController {
  constructor(
    private readonly createPrestamoUseCase:           CreatePrestamoUseCase,
    private readonly findAllPrestamosUseCase:         FindAllPrestamosUseCase,
    private readonly findOnePrestamoUseCase:          FindOnePrestamoUseCase,
    private readonly findByUsuarioPrestamoUseCase:    FindByUsuarioPrestamoUseCase,
    private readonly updatePrestamoUseCase:           UpdatePrestamoUseCase,
    private readonly removePrestamoUseCase:           RemovePrestamoUseCase,
    private readonly approvePrestamoUseCase:          ApprovePrestamoUseCase,
    private readonly rejectPrestamoUseCase:           RejectPrestamoUseCase,
    private readonly deliverPrestamoUseCase:          DeliverPrestamoUseCase,
    private readonly returnPrestamoUseCase:           ReturnPrestamoUseCase,
    private readonly cambiarUbicacionMaterialUseCase:         CambiarUbicacionMaterialUseCase,
    private readonly findHistorialByPrestamoUseCase:          FindByPrestamoPrestamoHistorialUseCase,
    private readonly checkVencidosPrestamosUseCase:           CheckVencidosPrestamosUseCase,
    private readonly findPorBodegaUseCase:                    FindPorBodegaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreatePrestamoDto) {
    return this.createPrestamoUseCase.execute(dto);
  }

  @Post('revisar-vencidos')
  revisarVencidos() {
    return this.checkVencidosPrestamosUseCase.execute();
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    const sedeId = user.rol === 'super_admin' ? undefined : user.sedeId;
    return this.findAllPrestamosUseCase.execute(sedeId);
  }

  @Get('por-bodega')
  porBodega(@CurrentUser() user: JwtPayload) {
    return this.findPorBodegaUseCase.execute(user.sub);
  }

  @Get('usuario/:usuarioId')
  findByUsuario(@Param('usuarioId', ParseUUIDPipe) usuarioId: string) {
    return this.findByUsuarioPrestamoUseCase.execute(usuarioId);
  }

  @Get(':id/historial')
  historial(@Param('id', ParseUUIDPipe) id: string) {
    return this.findHistorialByPrestamoUseCase.execute(id);
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

  @Post(':id/cambiar-ubicacion')
  cambiarUbicacion(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CambiarUbicacionMaterialDto,
  ) {
    return this.cambiarUbicacionMaterialUseCase.execute(id, dto);
  }
}
