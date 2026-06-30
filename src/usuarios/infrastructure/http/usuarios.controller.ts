import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/infrastructure/decorators/current-user.decorator';
import { CreateUsuarioUseCase }              from '../../application/use-cases/create-usuario.use-case';
import { FindAllUsuariosUseCase }            from '../../application/use-cases/find-all-usuarios.use-case';
import { FindUsuariosConFiltrosUseCase }     from '../../application/use-cases/find-usuarios-con-filtros.use-case';
import { FindOneUsuarioUseCase }             from '../../application/use-cases/find-one-usuario.use-case';
import { UpdateUsuarioUseCase }              from '../../application/use-cases/update-usuario.use-case';
import { RemoveUsuarioUseCase }              from '../../application/use-cases/remove-usuario.use-case';
import { CalculateUserPermissionsUseCase }   from '../../application/use-cases/calculate-user-permissions.use-case';
import { CreateUsuarioDto }                  from '../../application/dto/create-usuario.dto';
import { UpdateUsuarioDto }                  from '../../application/dto/update-usuario.dto';
import { GetUsuariosDto }                    from '../../application/dto/get-usuarios.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly createUsuarioUseCase:              CreateUsuarioUseCase,
    private readonly findAllUsuariosUseCase:            FindAllUsuariosUseCase,
    private readonly findUsuariosConFiltrosUseCase:     FindUsuariosConFiltrosUseCase,
    private readonly findOneUsuarioUseCase:             FindOneUsuarioUseCase,
    private readonly updateUsuarioUseCase:              UpdateUsuarioUseCase,
    private readonly removeUsuarioUseCase:              RemoveUsuarioUseCase,
    private readonly calculateUserPermissionsUseCase:   CalculateUserPermissionsUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.createUsuarioUseCase.execute(dto);
  }

  @Get()
  findAll(@Query() filters: GetUsuariosDto, @CurrentUser() user: JwtPayload) {
    if (user.rol === 'super_admin') {
      const soloRoles = ['administrador'];
      return this.findUsuariosConFiltrosUseCase.execute({ ...filters, sedeId: undefined, soloRoles });
    }
    const sedeId = user.sedeId;
    const hasFilters = filters.search || filters.rolId || filters.estado || filters.page || filters.limit;
    if (hasFilters) {
      return this.findUsuariosConFiltrosUseCase.execute({ ...filters, sedeId });
    }
    return this.findAllUsuariosUseCase.execute(sedeId);
  }

  // IMPORTANTE: debe ir ANTES de GET :id para que "permisos" no se interprete como UUID
  @Get(':id/permisos')
  getPermisos(@Param('id', ParseUUIDPipe) id: string) {
    return this.calculateUserPermissionsUseCase.execute(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneUsuarioUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUsuarioDto) {
    return this.updateUsuarioUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUsuarioUseCase.execute(id);
  }
}
