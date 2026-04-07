import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateSpaceDto } from 'src/spaces/application/dto/create-space.dto';
import { UpdateSpaceDto } from 'src/spaces/application/dto/update-space.dto';
import { CreateSpaceUseCase } from 'src/spaces/application/use-cases/create-space.use-case';
import { FindAllSpacesUseCase } from 'src/spaces/application/use-cases/find-all-spaces.use-case';
import { FindOneSpaceUseCase } from 'src/spaces/application/use-cases/find-one-space.use-case';
import { UpdateSpaceUseCase } from 'src/spaces/application/use-cases/update-space.use-case';
import { RemoveSpaceUseCase } from 'src/spaces/application/use-cases/remove-space.use-case';

@Controller('spaces')
export class SpacesController {
  constructor(
    private readonly createSpace: CreateSpaceUseCase,
    private readonly findAllSpaces: FindAllSpacesUseCase,
    private readonly findOneSpace: FindOneSpaceUseCase,
    private readonly updateSpace: UpdateSpaceUseCase,
    private readonly removeSpace: RemoveSpaceUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateSpaceDto) {
    return this.createSpace.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllSpaces.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneSpace.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() dto: UpdateSpaceDto,
  ) {
    return this.updateSpace.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeSpace.execute(id);
  }
}
