import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateFichaUseCase }    from '../../application/use-cases/create-ficha.use-case';
import { FindAllFichasUseCase }  from '../../application/use-cases/find-all-fichas.use-case';
import { FindOneFichaUseCase }   from '../../application/use-cases/find-one-ficha.use-case';
import { UpdateFichaUseCase }    from '../../application/use-cases/update-ficha.use-case';
import { RemoveFichaUseCase }    from '../../application/use-cases/remove-ficha.use-case';
import { CreateFichaDto }        from '../../application/dto/create-ficha.dto';
import { UpdateFichaDto }        from '../../application/dto/update-ficha.dto';

@Controller('fichas')
export class FichasController {
  constructor(
    private readonly createFichaUseCase:   CreateFichaUseCase,
    private readonly findAllFichasUseCase: FindAllFichasUseCase,
    private readonly findOneFichaUseCase:  FindOneFichaUseCase,
    private readonly updateFichaUseCase:   UpdateFichaUseCase,
    private readonly removeFichaUseCase:   RemoveFichaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateFichaDto) {
    return this.createFichaUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllFichasUseCase.execute();
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
}
