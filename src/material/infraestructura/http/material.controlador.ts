import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CrearMaterialCasoUso } from '../../aplicacion/casos-de-uso/crear-material.caso-uso';
import { BuscarTodosMaterialesCasoUso } from '../../aplicacion/casos-de-uso/buscar-todos-materiales.caso-uso';
import { BuscarUnMaterialCasoUso } from '../../aplicacion/casos-de-uso/buscar-un-material.caso-uso';
import { ActualizarMaterialCasoUso } from '../../aplicacion/casos-de-uso/actualizar-material.caso-uso';
import { EliminarMaterialCasoUso } from '../../aplicacion/casos-de-uso/eliminar-material.caso-uso';
import { CrearMaterialDto } from '../../aplicacion/dto/crear-material.dto';
import { ActualizarMaterialDto } from '../../aplicacion/dto/actualizar-material.dto';

@Controller('materiales')
export class MaterialControlador {
  constructor(
    private readonly crearMaterial: CrearMaterialCasoUso,
    private readonly buscarTodos: BuscarTodosMaterialesCasoUso,
    private readonly buscarUno: BuscarUnMaterialCasoUso,
    private readonly actualizarMaterial: ActualizarMaterialCasoUso,
    private readonly eliminarMaterial: EliminarMaterialCasoUso,
  ) {}

  @Post()
  crear(@Body() dto: CrearMaterialDto) {
    return this.crearMaterial.ejecutar(dto);
  }

  @Get()
  buscarTodosLos() {
    return this.buscarTodos.ejecutar();
  }

  @Get(':id')
  buscarUnoEl(@Param('id', ParseIntPipe) id: number) {
    return this.buscarUno.ejecutar(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarMaterialDto,
  ) {
    return this.actualizarMaterial.ejecutar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarMaterial.ejecutar(id);
  }
}