import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateProgramaDto } from "src/programas/application/dto/create-programa.dto";
import { UpdateProgramaDto } from "src/programas/application/dto/update-programa.dto";
import { CreateProgramaUseCase } from "src/programas/application/use-cases/create-programa.use-case";
import { FindAllProgramasUseCase } from "src/programas/application/use-cases/find-all-programas.use-case";
import { FindOneProgramaUseCase } from "src/programas/application/use-cases/find-one-programa.use-case";
import { RemoveProgramaUseCase } from "src/programas/application/use-cases/remove-programa.use-case";
import { UpdateProgramaUseCase } from "src/programas/application/use-cases/update-programa.use-case";

@Controller('programas')
export class ProgramasController {
  constructor(
    private readonly createUseCase: CreateProgramaUseCase,
    private readonly findAllUseCase: FindAllProgramasUseCase,
    private readonly findOneUseCase: FindOneProgramaUseCase,
    private readonly updateUseCase: UpdateProgramaUseCase,
    private readonly removeUseCase: RemoveProgramaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProgramaDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProgramaDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUseCase.execute(id);
  }
}