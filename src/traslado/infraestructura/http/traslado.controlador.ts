import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CrearTrasladoCasoUso } from '../../aplicacion/casos-de-uso/crear-traslado.caso-uso';
import { BuscarTodosTrasladosCasoUso } from '../../aplicacion/casos-de-uso/buscar-todos-traslados.caso-uso';
import { BuscarUnTrasladoCasoUso } from '../../aplicacion/casos-de-uso/buscar-un-traslado.caso-uso';
import { ActualizarTrasladoCasoUso } from '../../aplicacion/casos-de-uso/actualizar-traslado.caso-uso';
import { EliminarTrasladoCasoUso } from '../../aplicacion/casos-de-uso/eliminar-traslado.caso-uso';
import { CrearTrasladoDto } from '../../aplicacion/dto/crear-traslado.dto';
import { ActualizarTrasladoDto } from '../../aplicacion/dto/actualizar-traslado.dto';

@Controller('traslados')
export class TrasladoControlador {
  constructor(
    private readonly crear: CrearTrasladoCasoUso,
    private readonly buscarTodos: BuscarTodosTrasladosCasoUso,
    private readonly buscarUno: BuscarUnTrasladoCasoUso,
    private readonly actualizar: ActualizarTrasladoCasoUso,
    private readonly eliminar: EliminarTrasladoCasoUso,
  ) {}
  @Post() crear1(@Body() dto: CrearTrasladoDto) { return this.crear.ejecutar(dto); }
  @Get() listar() { return this.buscarTodos.ejecutar(); }
  @Get(':id') obtener(@Param('id', ParseIntPipe) id: number) { return this.buscarUno.ejecutar(id); }
  @Patch(':id') actualizar1(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarTrasladoDto) {
    return this.actualizar.ejecutar(id, dto);
  }
  @Delete(':id') eliminar1(@Param('id', ParseIntPipe) id: number) { return this.eliminar.ejecutar(id); }
}