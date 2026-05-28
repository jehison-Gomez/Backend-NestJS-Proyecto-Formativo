import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateMaterial_consumibleUseCase }    from '../../application/use-cases/create-material_consumible.use-case';
import { FindAllMaterial_consumibleUseCase }  from '../../application/use-cases/find-all-material_consumible.use-case';
import { FindOneMaterial_consumibleUseCase }   from '../../application/use-cases/find-one-material_consumible.use-case';
import { UpdateMaterial_consumibleUseCase }    from '../../application/use-cases/update-material_consumible.use-case';
import { RemoveMaterial_consumibleUseCase }    from '../../application/use-cases/remove-material_consumible.use-case';
import { CreateMaterial_consumibleDto }        from '../../application/dto/create-material_consumible.dto';
import { UpdateMaterial_consumibleDto }        from '../../application/dto/update-material_consumible.dto';

@Controller('material_consumible')
export class Material_consumibleController {
  constructor(
    private readonly createMaterial_consumibleUseCase:   CreateMaterial_consumibleUseCase,
    private readonly findAllMaterial_consumibleUseCase: FindAllMaterial_consumibleUseCase,
    private readonly findOneMaterial_consumibleUseCase:  FindOneMaterial_consumibleUseCase,
    private readonly updateMaterial_consumibleUseCase:   UpdateMaterial_consumibleUseCase,
    private readonly removeMaterial_consumibleUseCase:   RemoveMaterial_consumibleUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateMaterial_consumibleDto) {
    return this.createMaterial_consumibleUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllMaterial_consumibleUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneMaterial_consumibleUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMaterial_consumibleDto) {
    return this.updateMaterial_consumibleUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeMaterial_consumibleUseCase.execute(id);
  }
}
