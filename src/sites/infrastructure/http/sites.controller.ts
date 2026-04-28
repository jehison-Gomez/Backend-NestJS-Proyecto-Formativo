import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateSiteDto } from 'src/sites/application/dto/create-site.dto';
import { UpdateSiteDto } from 'src/sites/application/dto/update-site.dto';
import { CreateSiteUseCase } from 'src/sites/application/use-cases/create-site.use-case';
import { FindAllSitesUseCase } from 'src/sites/application/use-cases/find-all-sites.use-case';
import { FindOneSiteUseCase } from 'src/sites/application/use-cases/find-one-site.use-case';
import { UpdateSiteUseCase } from 'src/sites/application/use-cases/update-site.use-case';
import { RemoveSiteUseCase } from 'src/sites/application/use-cases/remove-site.use-case';

@Controller('sites')
export class SitesController {
  constructor(
    private readonly createSite: CreateSiteUseCase,
    private readonly findAllSites: FindAllSitesUseCase,
    private readonly findOneSite: FindOneSiteUseCase,
    private readonly updateSite: UpdateSiteUseCase,
    private readonly removeSite: RemoveSiteUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateSiteDto) {
    return this.createSite.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllSites.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneSite.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
    return this.updateSite.execute(id, updateSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeSite.execute(id);
  }
}
