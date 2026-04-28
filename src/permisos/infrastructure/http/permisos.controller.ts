import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreatePermisoDto } from "src/permisos/application/dto/create-permiso.dto";
import { UpdatePermisoDto } from "src/permisos/application/dto/update-permiso.dto";
import { CreatePermisoUseCase } from "src/permisos/application/use-cases/create-permiso.use-case";
import { FindAllPermisosUseCase } from "src/permisos/application/use-cases/find-all-permisos.use-case";
import { FindOnePermisoUseCase } from "src/permisos/application/use-cases/find-one-permiso.use-case";
import { RemovePermisoUseCase } from "src/permisos/application/use-cases/remove-permiso.use-case";
import { UpdatePermisoUseCase } from "src/permisos/application/use-cases/update-permiso.use-case";

@Controller('permisos')
export class PermisosController {
  constructor(
    private readonly createUseCase: CreatePermisoUseCase,
    private readonly findAllUseCase: FindAllPermisosUseCase,
    private readonly findOneUseCase: FindOnePermisoUseCase,
    private readonly updateUseCase: UpdatePermisoUseCase,
    private readonly removeUseCase: RemovePermisoUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreatePermisoDto) {
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
    @Body() dto: UpdatePermisoDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUseCase.execute(id);
  }
}