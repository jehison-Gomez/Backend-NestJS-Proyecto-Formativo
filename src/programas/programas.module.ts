import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { ProgramaOrmEntity }               from './infrastructure/persistence/programa.orm-entity';
import { TypeOrmProgramaRepository }       from './infrastructure/persistence/typeorm-programa.repository';
import { ProgramasController }                from './infrastructure/http/programas.controller';

// Domain
import { ProgramaRepository }              from './domain/programa.repository';

// Use Cases
import { CreateProgramaUseCase }           from './application/use-cases/create-programa.use-case';
import { FindAllProgramasUseCase }         from './application/use-cases/find-all-programas.use-case';
import { FindOneProgramaUseCase }          from './application/use-cases/find-one-programa.use-case';
import { UpdateProgramaUseCase }           from './application/use-cases/update-programa.use-case';
import { RemoveProgramaUseCase }           from './application/use-cases/remove-programa.use-case';
import { AreasModule }                     from 'src/areas/areas.module';
import { AuthModule }                      from 'src/auth/auth.module';

const USE_CASES = [
  CreateProgramaUseCase,
  FindAllProgramasUseCase,
  FindOneProgramaUseCase,
  UpdateProgramaUseCase,
  RemoveProgramaUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgramaOrmEntity]),
    forwardRef(() => AreasModule),
    AuthModule,
  ],
  controllers: [ProgramasController],
  providers: [
    ...USE_CASES,
    {
      provide:  ProgramaRepository,
      useClass: TypeOrmProgramaRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class ProgramasModule {}
