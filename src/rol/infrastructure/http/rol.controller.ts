import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateRolDto } from "src/rol/application/dto/create-rol.dto";
import { UpdateRolDto } from "src/rol/application/dto/update-rol.dto";
import { CreateRolUseCase } from "src/rol/application/use-cases/create-rol.use-case";
import { FindAllRolsUseCase } from "src/rol/application/use-cases/find-all-rols.use-case";
import { FindOneRolUseCase } from "src/rol/application/use-cases/find-one-rol.use-case";
import { RemoveRolUseCase } from "src/rol/application/use-cases/remove-rol.use-case";
import { UpdateRolUseCase } from "src/rol/application/use-cases/update-rol.use-case";

@Controller('rol')
export class RolsController {
  constructor(
    private readonly createUseCase: CreateRolUseCase,
    private readonly findAllUseCase: FindAllRolsUseCase,
    private readonly findOneUseCase: FindOneRolUseCase,
    private readonly updateUseCase: UpdateRolUseCase,
    private readonly removeUseCase: RemoveRolUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateRolDto) {
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
    @Body() dto: UpdateRolDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUseCase.execute(id);
  }
}