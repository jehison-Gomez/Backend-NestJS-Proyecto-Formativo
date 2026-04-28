import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateRegionDto } from 'src/regions/application/dto/create-region.dto';
import { UpdateRegionDto } from 'src/regions/application/dto/update-region.dto';
import { CreateRegionUseCase } from 'src/regions/application/use-cases/create-region.use-case';
import { FindAllRegionsUseCase } from 'src/regions/application/use-cases/find-all-regions.use-case';
import { FindOneRegionUseCase } from 'src/regions/application/use-cases/find-one-region.use-case';
import { UpdateRegionUseCase } from 'src/regions/application/use-cases/update-region.use-case';
import { RemoveRegionUseCase } from 'src/regions/application/use-cases/remove-region.use-case';

@Controller('regions')
export class RegionsController {
  constructor(
    private readonly createRegion: CreateRegionUseCase,
    private readonly findAllRegions: FindAllRegionsUseCase,
    private readonly findOneRegion: FindOneRegionUseCase,
    private readonly updateRegion: UpdateRegionUseCase,
    private readonly removeRegion: RemoveRegionUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateRegionDto) {
    return this.createRegion.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllRegions.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneRegion.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateRegionDto) {
    return this.updateRegion.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeRegion.execute(id);
  }
}
