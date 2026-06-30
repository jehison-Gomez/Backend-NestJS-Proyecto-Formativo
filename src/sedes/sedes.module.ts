import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { SedeOrmEntity }               from './infrastructure/persistence/sede.orm-entity';
import { TypeOrmSedeRepository }       from './infrastructure/persistence/typeorm-sede.repository';
import { SedesController }                from './infrastructure/http/sedes.controller';

// Domain
import { SedeRepository }              from './domain/sede.repository';

// Use Cases
import { CreateSedeUseCase }           from './application/use-cases/create-sede.use-case';
import { FindAllSedesUseCase }         from './application/use-cases/find-all-sedes.use-case';
import { FindOneSedeUseCase }          from './application/use-cases/find-one-sede.use-case';
import { UpdateSedeUseCase }           from './application/use-cases/update-sede.use-case';
import { RemoveSedeUseCase }           from './application/use-cases/remove-sede.use-case';
import { CentrosModule }               from 'src/centros/centros.module';

const USE_CASES = [
  CreateSedeUseCase,
  FindAllSedesUseCase,
  FindOneSedeUseCase,
  UpdateSedeUseCase,
  RemoveSedeUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([SedeOrmEntity]),
    CentrosModule,
  ],
  controllers: [SedesController],
  providers: [
    ...USE_CASES,
    {
      provide:  SedeRepository,
      useClass: TypeOrmSedeRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class SedesModule {}
