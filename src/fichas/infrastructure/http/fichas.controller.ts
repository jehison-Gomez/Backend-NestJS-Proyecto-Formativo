import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateFichaDto } from "src/fichas/application/dto/create-ficha.dto";
import { UpdateFichaDto } from "src/fichas/application/dto/update-ficha.dto";
import { CreateFichaUseCase } from "src/fichas/application/use-cases/create-ficha.use-case";
import { FindAllFichasUseCase } from "src/fichas/application/use-cases/find-all-fichas.use-case";
import { FindOneFichaUseCase } from "src/fichas/application/use-cases/find-one-ficha.use-case";
import { RemoveFichaUseCase } from "src/fichas/application/use-cases/remove-ficha.use-case";
import { UpdateFichaUseCase } from "src/fichas/application/use-cases/update-ficha.use-case";

@Controller('fichas')
export class FichasController {
  constructor(
    private readonly createUseCase: CreateFichaUseCase,
    private readonly findAllUseCase: FindAllFichasUseCase,
    private readonly findOneUseCase: FindOneFichaUseCase,
    private readonly updateUseCase: UpdateFichaUseCase,
    private readonly removeUseCase: RemoveFichaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateFichaDto) {
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
    @Body() dto: UpdateFichaDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUseCase.execute(id);
  }
}