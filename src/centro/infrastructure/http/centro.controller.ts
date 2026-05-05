import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CentroService } from '../../centro.service';
import { CreateCentroDto } from '../../application/dto/create-centro.dto';
import { UpdateCentroDto } from '../../application/dto/update-centro.dto';

@Controller('centros')
export class CentroController {
  constructor(private readonly centroService: CentroService) {}

  @Post()
  create(@Body() createCentroDto: CreateCentroDto) {
    return this.centroService.create(createCentroDto);
  }

  @Get()
  findAll() {
    return this.centroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.centroService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCentroDto: UpdateCentroDto,
  ) {
    return this.centroService.update(id, updateCentroDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.centroService.remove(id);
  }
}
