import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/infrastructure/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { CreateFichaUseCase }                  from '../../application/use-cases/create-ficha.use-case';
import { FindAllFichasUseCase }                from '../../application/use-cases/find-all-fichas.use-case';
import { FindOneFichaUseCase }                 from '../../application/use-cases/find-one-ficha.use-case';
import { UpdateFichaUseCase }                  from '../../application/use-cases/update-ficha.use-case';
import { RemoveFichaUseCase }                  from '../../application/use-cases/remove-ficha.use-case';
import { FindMaterialesDisponiblesUseCase }    from '../../application/use-cases/find-materiales-disponibles.use-case';
import { FindAprendicesByFichaUseCase }        from '../../application/use-cases/find-aprendices-by-ficha.use-case';
import { CreateFichaDto }                      from '../../application/dto/create-ficha.dto';
import { UpdateFichaDto }                      from '../../application/dto/update-ficha.dto';

@UseGuards(JwtAuthGuard)
@Controller('fichas')
export class FichasController {
  constructor(
    private readonly createFichaUseCase:              CreateFichaUseCase,
    private readonly findAllFichasUseCase:            FindAllFichasUseCase,
    private readonly findOneFichaUseCase:             FindOneFichaUseCase,
    private readonly updateFichaUseCase:              UpdateFichaUseCase,
    private readonly removeFichaUseCase:              RemoveFichaUseCase,
    private readonly findMaterialesDisponiblesUseCase: FindMaterialesDisponiblesUseCase,
    private readonly findAprendicesByFichaUseCase:    FindAprendicesByFichaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateFichaDto) {
    return this.createFichaUseCase.execute(dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    const sedeId = user.rol === 'super_admin' ? undefined : user.sedeId;
    return this.findAllFichasUseCase.execute(sedeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneFichaUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateFichaDto) {
    return this.updateFichaUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeFichaUseCase.execute(id);
  }

  @Get(':id/materiales-disponibles')
  getMaterialesDisponibles(@Param('id', ParseUUIDPipe) id: string) {
    return this.findMaterialesDisponiblesUseCase.execute(id);
  }

  @Get(':id/aprendices')
  getAprendices(@Param('id', ParseUUIDPipe) id: string) {
    return this.findAprendicesByFichaUseCase.execute(id);
  }
}
