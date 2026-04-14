import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CrearMaterialUbicacionCasoUso } from '../../aplicacion/casos-de-uso/crear-material-ubicacion.caso-uso';
import { BuscarTodosMaterialUbicacionCasoUso } from '../../aplicacion/casos-de-uso/buscar-todos-material-ubicacion.caso-uso';
import { BuscarUnMaterialUbicacionCasoUso } from '../../aplicacion/casos-de-uso/buscar-un-material-ubicacion.caso-uso';
import { EliminarMaterialUbicacionCasoUso } from '../../aplicacion/casos-de-uso/eliminar-material-ubicacion.caso-uso';
import { CrearMaterialUbicacionDto } from '../../aplicacion/dto/crear-material-ubicacion.dto';
@Controller('material-ubicacion')
export class MaterialUbicacionControlador {
  constructor(
    private readonly crear: CrearMaterialUbicacionCasoUso,
    private readonly buscarTodos: BuscarTodosMaterialUbicacionCasoUso,
    private readonly buscarUno: BuscarUnMaterialUbicacionCasoUso,
    private readonly eliminar: EliminarMaterialUbicacionCasoUso,
  ) {}
  @Post() crear1(@Body() dto: CrearMaterialUbicacionDto) { return this.crear.ejecutar(dto); }
  @Get() listar() { return this.buscarTodos.ejecutar(); }
  @Get(':id') obtener(@Param('id', ParseIntPipe) id: number) { return this.buscarUno.ejecutar(id); }
  @Delete(':id') eliminar1(@Param('id', ParseIntPipe) id: number) { return this.eliminar.ejecutar(id); }
}