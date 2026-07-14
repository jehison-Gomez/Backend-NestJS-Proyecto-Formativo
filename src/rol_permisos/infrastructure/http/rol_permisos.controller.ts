import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateRol_permisoUseCase }    from '../../application/use-cases/create-rol_permiso.use-case';
import { FindAllRol_permisosUseCase }  from '../../application/use-cases/find-all-rol_permisos.use-case';
import { FindOneRol_permisoUseCase }   from '../../application/use-cases/find-one-rol_permiso.use-case';
import { UpdateRol_permisoUseCase }    from '../../application/use-cases/update-rol_permiso.use-case';
import { RemoveRol_permisoUseCase }    from '../../application/use-cases/remove-rol_permiso.use-case';
import { CreateRol_permisoDto }        from '../../application/dto/create-rol_permiso.dto';
import { UpdateRol_permisoDto }        from '../../application/dto/update-rol_permiso.dto';

@Controller('rol_permisos')
export class Rol_permisosController {
  constructor(
    private readonly createRol_permisoUseCase:   CreateRol_permisoUseCase,
    private readonly findAllRol_permisosUseCase: FindAllRol_permisosUseCase,
    private readonly findOneRol_permisoUseCase:  FindOneRol_permisoUseCase,
    private readonly updateRol_permisoUseCase:   UpdateRol_permisoUseCase,
    private readonly removeRol_permisoUseCase:   RemoveRol_permisoUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateRol_permisoDto) {
    return this.createRol_permisoUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllRol_permisosUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneRol_permisoUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateRol_permisoDto) {
    return this.updateRol_permisoUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeRol_permisoUseCase.execute(id);
  }
}
