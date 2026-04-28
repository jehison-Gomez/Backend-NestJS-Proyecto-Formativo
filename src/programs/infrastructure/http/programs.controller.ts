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
import { CreateProgramDto } from 'src/programs/application/dto/create-program.dto';
import { UpdateProgramDto } from 'src/programs/application/dto/update-program.dto';
import { CreateProgramUseCase } from 'src/programs/application/use-cases/create-program.use-case';
import { FindAllProgramsUseCase } from 'src/programs/application/use-cases/find-all-programs.use-case';
import { FindOneProgramUseCase } from 'src/programs/application/use-cases/find-one-program.use-case';
import { UpdateProgramUseCase } from 'src/programs/application/use-cases/update-program.use-case';
import { RemoveProgramUseCase } from 'src/programs/application/use-cases/remove-program.use-case';

@Controller('programs')
export class ProgramsController {
  constructor(
    private readonly createProgram: CreateProgramUseCase,
    private readonly findAllPrograms: FindAllProgramsUseCase,
    private readonly findOneProgram: FindOneProgramUseCase,
    private readonly updateProgram: UpdateProgramUseCase,
    private readonly removeProgram: RemoveProgramUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProgramDto) {
    return this.createProgram.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllPrograms.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneProgram.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProgramDto,
  ) {
    return this.updateProgram.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeProgram.execute(id);
  }
}
