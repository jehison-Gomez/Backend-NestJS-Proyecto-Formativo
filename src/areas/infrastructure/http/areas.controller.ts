import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AreasService } from '../../areas.service';
import { CreateAreaDto } from '../../application/dto/create-area.dto';
import { UpdateAreaDto } from '../../application/dto/update-area.dto';
import { CreateAreaUseCase } from 'src/areas/application/use-cases/create-area.use-case';
import { FindAllAreasUseCase } from 'src/areas/application/use-cases/find-all-areas.use-case';
import { FindOneAreaUseCase } from 'src/areas/application/use-cases/find-one-area.use-case';
import { UpdateAreaUseCase } from 'src/areas/application/use-cases/update-area.use-case';
import { RemoveAreaUseCase } from 'src/areas/application/use-cases/remove-area.use-case';

@Controller('areas')
export class AreasController {
  constructor(
    private readonly createArea: CreateAreaUseCase,
    private readonly findAllAreas: FindAllAreasUseCase,
    private readonly findOneArea: FindOneAreaUseCase,
    private readonly updateArea: UpdateAreaUseCase,
    private readonly removeArea: RemoveAreaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateAreaDto) {
    return this.createArea.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllAreas.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneArea.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() dto: UpdateAreaDto,
  ) {
    return this.updateArea.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeArea.execute(id);
  }
}
