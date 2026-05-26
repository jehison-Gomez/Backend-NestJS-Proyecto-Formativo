import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateMaterial_ubicacionUseCase }    from '../../application/use-cases/create-material_ubicacion.use-case';
import { FindAllMaterial_ubicacionUseCase }  from '../../application/use-cases/find-all-material_ubicacion.use-case';
import { FindOneMaterial_ubicacionUseCase }   from '../../application/use-cases/find-one-material_ubicacion.use-case';
import { UpdateMaterial_ubicacionUseCase }    from '../../application/use-cases/update-material_ubicacion.use-case';
import { RemoveMaterial_ubicacionUseCase }    from '../../application/use-cases/remove-material_ubicacion.use-case';
import { CreateMaterial_ubicacionDto }        from '../../application/dto/create-material_ubicacion.dto';
import { UpdateMaterial_ubicacionDto }        from '../../application/dto/update-material_ubicacion.dto';

@Controller('material_ubicacion')
export class Material_ubicacionController {
  constructor(
    private readonly createMaterial_ubicacionUseCase:   CreateMaterial_ubicacionUseCase,
    private readonly findAllMaterial_ubicacionUseCase: FindAllMaterial_ubicacionUseCase,
    private readonly findOneMaterial_ubicacionUseCase:  FindOneMaterial_ubicacionUseCase,
    private readonly updateMaterial_ubicacionUseCase:   UpdateMaterial_ubicacionUseCase,
    private readonly removeMaterial_ubicacionUseCase:   RemoveMaterial_ubicacionUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateMaterial_ubicacionDto) {
    return this.createMaterial_ubicacionUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllMaterial_ubicacionUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneMaterial_ubicacionUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMaterial_ubicacionDto) {
    return this.updateMaterial_ubicacionUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeMaterial_ubicacionUseCase.execute(id);
  }
}
