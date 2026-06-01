import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateUsuario_permisoUseCase }          from '../../application/use-cases/create-usuario_permiso.use-case';
import { FindAllUsuario_permisosUseCase }         from '../../application/use-cases/find-all-usuario_permisos.use-case';
import { FindOneUsuario_permisoUseCase }          from '../../application/use-cases/find-one-usuario_permiso.use-case';
import { FindByUsuarioUsuario_permisoUseCase }    from '../../application/use-cases/find-by-usuario-usuario_permiso.use-case';
import { RemoveUsuario_permisoUseCase }           from '../../application/use-cases/remove-usuario_permiso.use-case';
import { CreateUsuario_permisoDto }               from '../../application/dto/create-usuario_permiso.dto';

@Controller('usuario_permisos')
export class Usuario_permisosController {
  constructor(
    private readonly createUsuario_permisoUseCase:       CreateUsuario_permisoUseCase,
    private readonly findAllUsuario_permisosUseCase:      FindAllUsuario_permisosUseCase,
    private readonly findOneUsuario_permisoUseCase:       FindOneUsuario_permisoUseCase,
    private readonly findByUsuarioUsuario_permisoUseCase: FindByUsuarioUsuario_permisoUseCase,
    private readonly removeUsuario_permisoUseCase:        RemoveUsuario_permisoUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateUsuario_permisoDto) {
    return this.createUsuario_permisoUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllUsuario_permisosUseCase.execute();
  }

  @Get('usuario/:usuarioId')
  findByUsuario(@Param('usuarioId', ParseUUIDPipe) usuarioId: string) {
    return this.findByUsuarioUsuario_permisoUseCase.execute(usuarioId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneUsuario_permisoUseCase.execute(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUsuario_permisoUseCase.execute(id);
  }
}
