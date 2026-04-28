import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UbicacionesService } from '../../ubicaciones.service';
import { CreateUbicacionDto } from '../../application/dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from '../../application/dto/update-ubicacion.dto';

@Controller('ubicaciones')
export class UbicacionesController {
  constructor(private readonly ubicacionesService: UbicacionesService) {}

  @Post()
  create(@Body() dto: CreateUbicacionDto) {
    return this.ubicacionesService.create(dto);
  }

  @Get()
  findAll() {
    return this.ubicacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ubicacionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUbicacionDto) {
    return this.ubicacionesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ubicacionesService.remove(id);
  }
}