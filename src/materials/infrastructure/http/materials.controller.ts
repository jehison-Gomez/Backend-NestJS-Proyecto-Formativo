import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch, // Nest suele usar Patch para actualizaciones parciales, pero Put está bien
  Delete,
} from '@nestjs/common';
import { MaterialsService } from '../../materials.service';
import { CreateMaterialDto } from '../../application/dto/create-material.dto';
import { UpdateMaterialDto } from '../../application/dto/update-material.dto';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  create(@Body() dto: CreateMaterialDto) {
    return this.materialsService.create(dto);
  }

  @Get()
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) { // <-- Cambiado de number a string
    return this.materialsService.findOne(id);
  }

  @Patch(':id') // Cambié Put por Patch para que coincida con lo habitual en Nest
  update(@Param('id') id: string, @Body() dto: UpdateMaterialDto) { // <-- Cambiado a string
    return this.materialsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { // <-- Cambiado a string
    return this.materialsService.remove(id);
  }
}