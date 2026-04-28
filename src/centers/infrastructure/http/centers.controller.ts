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
import { CreateCenterDto } from 'src/centers/application/dto/create-center.dto';
import { UpdateCenterDto } from 'src/centers/application/dto/update-center.dto';
import { CreateCenterUseCase } from 'src/centers/application/use-cases/create-center.use-case';
import { FindAllCentersUseCase } from 'src/centers/application/use-cases/find-all-centers.use-case';
import { FindOneCenterUseCase } from 'src/centers/application/use-cases/find-one-center.use-case';
import { UpdateCenterUseCase } from 'src/centers/application/use-cases/update-center.use-case';
import { RemoveCenterUseCase } from 'src/centers/application/use-cases/remove-center.use-case';

@Controller('centers')
export class CentersController {
  constructor(
    private readonly createCenter: CreateCenterUseCase,
    private readonly findAllCenters: FindAllCentersUseCase,
    private readonly findOneCenter: FindOneCenterUseCase,
    private readonly updateCenter: UpdateCenterUseCase,
    private readonly removeCenter: RemoveCenterUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCenterDto) {
    return this.createCenter.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllCenters.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneCenter.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCenterDto) {
    return this.updateCenter.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeCenter.execute(id);
  }
}
