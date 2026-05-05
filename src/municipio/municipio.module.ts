import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipioOrmEntity } from './infrastructure/persistence/municipio.orm-entity';
import { TypeOrmMunicipioRepository } from './infrastructure/persistence/typeorm-municipio.repository';
import { MunicipioController } from './infrastructure/http/municipio.controller';
import { MunicipioRepository } from './domain/municipio.repository';
import { MunicipioService } from './municipio.service';
import { CreateMunicipioUseCase } from './application/use-cases/create-municipio.use-case';
import { FindAllMunicipiosUseCase } from './application/use-cases/find-all-municipios.use-case';
import { FindOneMunicipioUseCase } from './application/use-cases/find-one-municipio.use-case';
import { UpdateMunicipioUseCase } from './application/use-cases/update-municipio.use-case';
import { RemoveMunicipioUseCase } from './application/use-cases/remove-municipio.use-case';

const USE_CASES = [
  CreateMunicipioUseCase,
  FindAllMunicipiosUseCase,
  FindOneMunicipioUseCase,
  UpdateMunicipioUseCase,
  RemoveMunicipioUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([MunicipioOrmEntity])],
  controllers: [MunicipioController],
  providers: [
    MunicipioService,
    ...USE_CASES,
    {
      provide: MunicipioRepository,
      useClass: TypeOrmMunicipioRepository,
    },
  ],
  exports: [MunicipioService],
})
export class MunicipioModule {}
