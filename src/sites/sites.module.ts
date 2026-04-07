import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ORM
import { SiteOrmEntity } from './infrastructure/persistence/site.orm-entity';
import { TypeOrmSiteRepository } from './infrastructure/persistence/typeorm-site.repository';

// Controlador
import { SitesController } from './infrastructure/http/sites.controller';

// Casos de uso
import { CreateSiteUseCase } from './application/use-cases/create-site.use-case';
import { FindAllSitesUseCase } from './application/use-cases/find-all-sites.use-case';
import { FindOneSiteUseCase } from './application/use-cases/find-one-site.use-case';
import { UpdateSiteUseCase } from './application/use-cases/update-site.use-case';
import { RemoveSiteUseCase } from './application/use-cases/remove-site.use-case';
import { SITE_REPOSITORY } from './domain/site.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SiteOrmEntity])],
  controllers: [SitesController],
  providers: [
    {
      provide: SITE_REPOSITORY,
      useClass: TypeOrmSiteRepository,
    },
    CreateSiteUseCase,
    FindAllSitesUseCase,
    FindOneSiteUseCase,
    UpdateSiteUseCase,
    RemoveSiteUseCase,
  ],
})
export class SitesModule {}
