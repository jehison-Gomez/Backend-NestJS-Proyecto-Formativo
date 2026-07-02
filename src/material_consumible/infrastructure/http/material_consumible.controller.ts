import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/infrastructure/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { CreateMaterial_consumibleUseCase }    from '../../application/use-cases/create-material_consumible.use-case';
import { FindAllMaterial_consumibleUseCase }   from '../../application/use-cases/find-all-material_consumible.use-case';
import { FindOneMaterial_consumibleUseCase }   from '../../application/use-cases/find-one-material_consumible.use-case';
import { UpdateMaterial_consumibleUseCase }    from '../../application/use-cases/update-material_consumible.use-case';
import { RemoveMaterial_consumibleUseCase }    from '../../application/use-cases/remove-material_consumible.use-case';
import { IngresarStockUseCase }                from '../../application/use-cases/ingresar-stock.use-case';
import { FindKardexMaterial_consumibleUseCase } from '../../application/use-cases/find-kardex-material_consumible.use-case';
import { CreateMaterial_consumibleDto }        from '../../application/dto/create-material_consumible.dto';
import { UpdateMaterial_consumibleDto }        from '../../application/dto/update-material_consumible.dto';
import { IngresarStockDto }                    from '../../application/dto/ingresar-stock.dto';

@UseGuards(JwtAuthGuard)
@Controller('material_consumible')
export class Material_consumibleController {
  constructor(
    private readonly createMaterial_consumibleUseCase:   CreateMaterial_consumibleUseCase,
    private readonly findAllMaterial_consumibleUseCase:  FindAllMaterial_consumibleUseCase,
    private readonly findOneMaterial_consumibleUseCase:  FindOneMaterial_consumibleUseCase,
    private readonly updateMaterial_consumibleUseCase:   UpdateMaterial_consumibleUseCase,
    private readonly removeMaterial_consumibleUseCase:   RemoveMaterial_consumibleUseCase,
    private readonly ingresarStockUseCase:                IngresarStockUseCase,
    private readonly findKardexMaterial_consumibleUseCase: FindKardexMaterial_consumibleUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateMaterial_consumibleDto) {
    return this.createMaterial_consumibleUseCase.execute(dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    const sedeId = user.rol === 'super_admin' ? undefined : user.sedeId;
    return this.findAllMaterial_consumibleUseCase.execute(sedeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneMaterial_consumibleUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMaterial_consumibleDto) {
    return this.updateMaterial_consumibleUseCase.execute(id, dto);
  }

  @Get(':id/kardex')
  kardex(@Param('id', ParseUUIDPipe) id: string) {
    return this.findKardexMaterial_consumibleUseCase.execute(id);
  }

  @Post(':id/ingresar-stock')
  ingresarStock(@Param('id', ParseUUIDPipe) id: string, @Body() dto: IngresarStockDto) {
    return this.ingresarStockUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeMaterial_consumibleUseCase.execute(id);
  }
}
