import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateCategoria_materialUseCase }    from '../../application/use-cases/create-categoria_material.use-case';
import { FindAllCategoria_materialUseCase }  from '../../application/use-cases/find-all-categoria_material.use-case';
import { FindOneCategoria_materialUseCase }   from '../../application/use-cases/find-one-categoria_material.use-case';
import { UpdateCategoria_materialUseCase }    from '../../application/use-cases/update-categoria_material.use-case';
import { RemoveCategoria_materialUseCase }    from '../../application/use-cases/remove-categoria_material.use-case';
import { CreateCategoria_materialDto }        from '../../application/dto/create-categoria_material.dto';
import { UpdateCategoria_materialDto }        from '../../application/dto/update-categoria_material.dto';

@Controller('categoria_material')
export class Categoria_materialController {
  constructor(
    private readonly createCategoria_materialUseCase:   CreateCategoria_materialUseCase,
    private readonly findAllCategoria_materialUseCase: FindAllCategoria_materialUseCase,
    private readonly findOneCategoria_materialUseCase:  FindOneCategoria_materialUseCase,
    private readonly updateCategoria_materialUseCase:   UpdateCategoria_materialUseCase,
    private readonly removeCategoria_materialUseCase:   RemoveCategoria_materialUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCategoria_materialDto) {
    return this.createCategoria_materialUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllCategoria_materialUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneCategoria_materialUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCategoria_materialDto) {
    return this.updateCategoria_materialUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeCategoria_materialUseCase.execute(id);
  }
}
