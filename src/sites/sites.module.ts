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

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteOrmEntity])
  ],
  controllers: [SitesController],
  providers: [
    // Adaptador
    TypeOrmSiteRepository,

    // Casos de uso
    {
      provide: CreateSiteUseCase,
      useFactory: (repo: TypeOrmSiteRepository) =>
        new CreateSiteUseCase(repo),
      inject: [TypeOrmSiteRepository],
    },
    {
      provide: FindAllSitesUseCase,
      useFactory: (repo: TypeOrmSiteRepository) =>
        new FindAllSitesUseCase(repo),
      inject: [TypeOrmSiteRepository],
    },
    {
      provide: FindOneSiteUseCase,
      useFactory: (repo: TypeOrmSiteRepository) =>
        new FindOneSiteUseCase(repo),
      inject: [TypeOrmSiteRepository],
    },
    {
      provide: UpdateSiteUseCase,
      useFactory: (repo: TypeOrmSiteRepository, findOne: FindOneSiteUseCase) =>
        new UpdateSiteUseCase(repo, findOne),
      inject: [TypeOrmSiteRepository, FindOneSiteUseCase],
    },
    {
      provide: RemoveSiteUseCase,
      useFactory: (repo: TypeOrmSiteRepository, findOne: FindOneSiteUseCase) =>
        new RemoveSiteUseCase(repo, findOne),
      inject: [TypeOrmSiteRepository, FindOneSiteUseCase],
    },
  ],
})
export class SitesModule {}
