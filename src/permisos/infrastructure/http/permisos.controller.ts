import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreatePermisoUseCase }    from '../../application/use-cases/create-permiso.use-case';
import { FindAllPermisosUseCase }  from '../../application/use-cases/find-all-permisos.use-case';
import { FindOnePermisoUseCase }   from '../../application/use-cases/find-one-permiso.use-case';
import { UpdatePermisoUseCase }    from '../../application/use-cases/update-permiso.use-case';
import { RemovePermisoUseCase }    from '../../application/use-cases/remove-permiso.use-case';
import { CreatePermisoDto }        from '../../application/dto/create-permiso.dto';
import { UpdatePermisoDto }        from '../../application/dto/update-permiso.dto';

@Controller('permisos')
export class PermisosController {
  constructor(
    private readonly createPermisoUseCase:   CreatePermisoUseCase,
    private readonly findAllPermisosUseCase: FindAllPermisosUseCase,
    private readonly findOnePermisoUseCase:  FindOnePermisoUseCase,
    private readonly updatePermisoUseCase:   UpdatePermisoUseCase,
    private readonly removePermisoUseCase:   RemovePermisoUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreatePermisoDto) {
    return this.createPermisoUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllPermisosUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOnePermisoUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePermisoDto) {
    return this.updatePermisoUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removePermisoUseCase.execute(id);
  }
}
