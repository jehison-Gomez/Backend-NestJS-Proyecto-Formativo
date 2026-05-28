import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateMaterial_itemUseCase }    from '../../application/use-cases/create-material_item.use-case';
import { FindAllMaterial_itemUseCase }  from '../../application/use-cases/find-all-material_item.use-case';
import { FindOneMaterial_itemUseCase }   from '../../application/use-cases/find-one-material_item.use-case';
import { UpdateMaterial_itemUseCase }    from '../../application/use-cases/update-material_item.use-case';
import { RemoveMaterial_itemUseCase }    from '../../application/use-cases/remove-material_item.use-case';
import { CreateMaterial_itemDto }        from '../../application/dto/create-material_item.dto';
import { UpdateMaterial_itemDto }        from '../../application/dto/update-material_item.dto';

@Controller('material_item')
export class Material_itemController {
  constructor(
    private readonly createMaterial_itemUseCase:   CreateMaterial_itemUseCase,
    private readonly findAllMaterial_itemUseCase: FindAllMaterial_itemUseCase,
    private readonly findOneMaterial_itemUseCase:  FindOneMaterial_itemUseCase,
    private readonly updateMaterial_itemUseCase:   UpdateMaterial_itemUseCase,
    private readonly removeMaterial_itemUseCase:   RemoveMaterial_itemUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateMaterial_itemDto) {
    return this.createMaterial_itemUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllMaterial_itemUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneMaterial_itemUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMaterial_itemDto) {
    return this.updateMaterial_itemUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeMaterial_itemUseCase.execute(id);
  }
}
