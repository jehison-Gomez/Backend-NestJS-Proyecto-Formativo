import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateAreaUseCase }    from '../../application/use-cases/create-area.use-case';
import { FindAllAreasUseCase }  from '../../application/use-cases/find-all-areas.use-case';
import { FindOneAreaUseCase }   from '../../application/use-cases/find-one-area.use-case';
import { UpdateAreaUseCase }    from '../../application/use-cases/update-area.use-case';
import { RemoveAreaUseCase }    from '../../application/use-cases/remove-area.use-case';
import { CreateAreaDto }        from '../../application/dto/create-area.dto';
import { UpdateAreaDto }        from '../../application/dto/update-area.dto';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/infrastructure/decorators/current-user.decorator';

@Controller('areas')
export class AreasController {
  constructor(
    private readonly createAreaUseCase:   CreateAreaUseCase,
    private readonly findAllAreasUseCase: FindAllAreasUseCase,
    private readonly findOneAreaUseCase:  FindOneAreaUseCase,
    private readonly updateAreaUseCase:   UpdateAreaUseCase,
    private readonly removeAreaUseCase:   RemoveAreaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateAreaDto) {
    return this.createAreaUseCase.execute(dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    const sedeId = user.rol === 'super_admin' ? undefined : user.sedeId;
    return this.findAllAreasUseCase.execute(sedeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneAreaUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAreaDto) {
    return this.updateAreaUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeAreaUseCase.execute(id);
  }
}
