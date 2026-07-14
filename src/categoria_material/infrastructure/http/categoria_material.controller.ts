import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/infrastructure/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { CreateCategoria_materialUseCase }    from '../../application/use-cases/create-categoria_material.use-case';
import { FindAllCategoria_materialUseCase }  from '../../application/use-cases/find-all-categoria_material.use-case';
import { FindOneCategoria_materialUseCase }   from '../../application/use-cases/find-one-categoria_material.use-case';
import { UpdateCategoria_materialUseCase }    from '../../application/use-cases/update-categoria_material.use-case';
import { RemoveCategoria_materialUseCase }    from '../../application/use-cases/remove-categoria_material.use-case';
import { CreateCategoria_materialDto }        from '../../application/dto/create-categoria_material.dto';
import { UpdateCategoria_materialDto }        from '../../application/dto/update-categoria_material.dto';

@UseGuards(JwtAuthGuard)
@Controller('categoria_material')
export class Categoria_materialController {
  constructor(
    private readonly createCategoria_materialUseCase:   CreateCategoria_materialUseCase,
    private readonly findAllCategoria_materialUseCase: FindAllCategoria_materialUseCase,
    private readonly findOneCategoria_materialUseCase:  FindOneCategoria_materialUseCase,
    private readonly updateCategoria_materialUseCase:   UpdateCategoria_materialUseCase,
    private readonly removeCategoria_materialUseCase:   RemoveCategoria_materialUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCategoria_materialDto, @CurrentUser() user: JwtPayload) {
    if (user.rol !== 'super_admin' && user.sedeId) {
      (dto as any).sedeId = user.sedeId;
    }
    return this.createCategoria_materialUseCase.execute(dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    const sedeId = user.rol === 'super_admin' ? undefined : user.sedeId;
    return this.findAllCategoria_materialUseCase.execute(sedeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneCategoria_materialUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCategoria_materialDto) {
    return this.updateCategoria_materialUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeCategoria_materialUseCase.execute(id);
  }
}
