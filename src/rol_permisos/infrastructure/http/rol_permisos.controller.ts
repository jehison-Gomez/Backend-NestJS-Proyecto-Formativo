import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateRolPermisoDto } from "src/rol_permisos/application/dto/create-rol_permiso.dto";
import { UpdateRolPermisoDto } from "src/rol_permisos/application/dto/update-rol_permiso.dto";
import { CreateRolPermisoUseCase } from "src/rol_permisos/application/use-cases/create-rol_permiso.use-case";
import { FindAllRolPermisosUseCase } from "src/rol_permisos/application/use-cases/find-all-rol_permisos.use-case";
import { FindOneRolPermisoUseCase } from "src/rol_permisos/application/use-cases/find-one-rol_permiso.use-case";
import { RemoveRolPermisoUseCase } from "src/rol_permisos/application/use-cases/remove-rol_permiso.use-case";
import { UpdateRolPermisoUseCase } from "src/rol_permisos/application/use-cases/update-rol_permiso.use-case";

@Controller('rol_permisos')
export class RolPermisosController {
  constructor(
    private readonly createUseCase: CreateRolPermisoUseCase,
    private readonly findAllUseCase: FindAllRolPermisosUseCase,
    private readonly findOneUseCase: FindOneRolPermisoUseCase,
    private readonly updateUseCase: UpdateRolPermisoUseCase,
    private readonly removeUseCase: RemoveRolPermisoUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateRolPermisoDto) {
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
    @Body() dto: UpdateRolPermisoDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUseCase.execute(id);
  }
}