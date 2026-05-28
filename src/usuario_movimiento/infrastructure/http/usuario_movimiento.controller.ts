import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateUsuario_movimientoUseCase }    from '../../application/use-cases/create-usuario_movimiento.use-case';
import { FindAllUsuario_movimientoUseCase }  from '../../application/use-cases/find-all-usuario_movimiento.use-case';
import { FindOneUsuario_movimientoUseCase }   from '../../application/use-cases/find-one-usuario_movimiento.use-case';
import { UpdateUsuario_movimientoUseCase }    from '../../application/use-cases/update-usuario_movimiento.use-case';
import { RemoveUsuario_movimientoUseCase }    from '../../application/use-cases/remove-usuario_movimiento.use-case';
import { CreateUsuario_movimientoDto }        from '../../application/dto/create-usuario_movimiento.dto';
import { UpdateUsuario_movimientoDto }        from '../../application/dto/update-usuario_movimiento.dto';

@Controller('usuario_movimiento')
export class Usuario_movimientoController {
  constructor(
    private readonly createUsuario_movimientoUseCase:   CreateUsuario_movimientoUseCase,
    private readonly findAllUsuario_movimientoUseCase: FindAllUsuario_movimientoUseCase,
    private readonly findOneUsuario_movimientoUseCase:  FindOneUsuario_movimientoUseCase,
    private readonly updateUsuario_movimientoUseCase:   UpdateUsuario_movimientoUseCase,
    private readonly removeUsuario_movimientoUseCase:   RemoveUsuario_movimientoUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateUsuario_movimientoDto) {
    return this.createUsuario_movimientoUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllUsuario_movimientoUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneUsuario_movimientoUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUsuario_movimientoDto) {
    return this.updateUsuario_movimientoUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUsuario_movimientoUseCase.execute(id);
  }
}
