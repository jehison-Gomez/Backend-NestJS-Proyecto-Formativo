import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateMunicipioUseCase }    from '../../application/use-cases/create-municipio.use-case';
import { FindAllMunicipiosUseCase }  from '../../application/use-cases/find-all-municipios.use-case';
import { FindOneMunicipioUseCase }   from '../../application/use-cases/find-one-municipio.use-case';
import { UpdateMunicipioUseCase }    from '../../application/use-cases/update-municipio.use-case';
import { RemoveMunicipioUseCase }    from '../../application/use-cases/remove-municipio.use-case';
import { CreateMunicipioDto }        from '../../application/dto/create-municipio.dto';
import { UpdateMunicipioDto }        from '../../application/dto/update-municipio.dto';

@Controller('municipios')
export class MunicipiosController {
  constructor(
    private readonly createMunicipioUseCase:   CreateMunicipioUseCase,
    private readonly findAllMunicipiosUseCase: FindAllMunicipiosUseCase,
    private readonly findOneMunicipioUseCase:  FindOneMunicipioUseCase,
    private readonly updateMunicipioUseCase:   UpdateMunicipioUseCase,
    private readonly removeMunicipioUseCase:   RemoveMunicipioUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateMunicipioDto) {
    return this.createMunicipioUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllMunicipiosUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneMunicipioUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMunicipioDto) {
    return this.updateMunicipioUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeMunicipioUseCase.execute(id);
  }
}
