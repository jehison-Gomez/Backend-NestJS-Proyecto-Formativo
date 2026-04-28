import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CrearPrestamoCasoUso } from '../../aplicacion/casos-de-uso/crear-prestamo.caso-uso.js';
import { BuscarTodosPrestamosCasoUso } from '../../aplicacion/casos-de-uso/buscar-todos-prestamos.caso-uso.js';
import { BuscarUnPrestamoCasoUso } from '../../aplicacion/casos-de-uso/buscar-un-prestamo.caso-uso.js';
import { ActualizarPrestamoCasoUso } from '../../aplicacion/casos-de-uso/actualizar-prestamo.caso-uso.js';
import { EliminarPrestamoCasoUso } from '../../aplicacion/casos-de-uso/eliminar-prestamo.caso-uso.js';
import { CrearPrestamoDto } from '../../aplicacion/dto/crear-prestamo.dto.js';
import { ActualizarPrestamoDto } from '../../aplicacion/dto/actualizar-prestamo.dto.js';

@ApiTags('prestamos')
@Controller('prestamos')
export class PrestamoControlador {
  constructor(
    private readonly crear: CrearPrestamoCasoUso,
    private readonly buscarTodos: BuscarTodosPrestamosCasoUso,
    private readonly buscarUno: BuscarUnPrestamoCasoUso,
    private readonly actualizar: ActualizarPrestamoCasoUso,
    private readonly eliminar: EliminarPrestamoCasoUso,
  ) {}

  @Post() @ApiOperation({ summary: 'Crear préstamo' }) @ApiResponse({ status: 201 })
  crear1(@Body() dto: CrearPrestamoDto) { return this.crear.ejecutar(dto); }

  @Get() @ApiOperation({ summary: 'Listar préstamos' })
  listar() { return this.buscarTodos.ejecutar(); }

  @Get(':id') @ApiOperation({ summary: 'Obtener préstamo por ID' })
  obtener(@Param('id', ParseIntPipe) id: number) { return this.buscarUno.ejecutar(id); }

  @Patch(':id') @ApiOperation({ summary: 'Actualizar préstamo' })
  actualizar1(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarPrestamoDto) {
    return this.actualizar.ejecutar(id, dto);
  }

  @Delete(':id') @ApiOperation({ summary: 'Eliminar préstamo' })
  eliminar1(@Param('id', ParseIntPipe) id: number) { return this.eliminar.ejecutar(id); }
}