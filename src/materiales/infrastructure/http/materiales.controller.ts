import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateMaterialeUseCase }      from '../../application/use-cases/create-materiale.use-case';
import { FindAllMaterialesUseCase }    from '../../application/use-cases/find-all-materiales.use-case';
import { FindOneMaterialeUseCase }     from '../../application/use-cases/find-one-materiale.use-case';
import { UpdateMaterialeUseCase }      from '../../application/use-cases/update-materiale.use-case';
import { RemoveMaterialeUseCase }      from '../../application/use-cases/remove-materiale.use-case';
import { FindKardexMaterialeUseCase }  from '../../application/use-cases/find-kardex-materiale.use-case';
import { CreateMaterialeDto }          from '../../application/dto/create-materiale.dto';
import { UpdateMaterialeDto }          from '../../application/dto/update-materiale.dto';

@Controller('materiales')
export class MaterialesController {
  constructor(
    private readonly createMaterialeUseCase:     CreateMaterialeUseCase,
    private readonly findAllMaterialesUseCase:   FindAllMaterialesUseCase,
    private readonly findOneMaterialeUseCase:    FindOneMaterialeUseCase,
    private readonly updateMaterialeUseCase:     UpdateMaterialeUseCase,
    private readonly removeMaterialeUseCase:     RemoveMaterialeUseCase,
    private readonly findKardexMaterialeUseCase: FindKardexMaterialeUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateMaterialeDto) {
    return this.createMaterialeUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllMaterialesUseCase.execute();
  }

  @Get(':id/kardex')
  kardex(@Param('id', ParseUUIDPipe) id: string) {
    return this.findKardexMaterialeUseCase.execute(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneMaterialeUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMaterialeDto) {
    return this.updateMaterialeUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeMaterialeUseCase.execute(id);
  }
}
