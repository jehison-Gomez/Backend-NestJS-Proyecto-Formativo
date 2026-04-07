import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ORM
import { ProgramOrmEntity } from './infrastructure/persistence/program.orm-entity';
import { TypeOrmProgramRepository } from './infrastructure/persistence/typeorm-program.repository';

// Controlador
import { ProgramsController } from './infrastructure/http/programs.controller';

// Casos de uso
import { CreateProgramUseCase } from './application/use-cases/create-program.use-case';
import { FindAllProgramsUseCase } from './application/use-cases/find-all-programs.use-case';
import { FindOneProgramUseCase } from './application/use-cases/find-one-program.use-case';
import { UpdateProgramUseCase } from './application/use-cases/update-program.use-case';
import { RemoveProgramUseCase } from './application/use-cases/remove-program.use-case';
import { PROGRAM_REPOSITORY } from './domain/program.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramOrmEntity])],
  controllers: [ProgramsController],
  providers: [
    {
      provide: PROGRAM_REPOSITORY,
      useClass: TypeOrmProgramRepository,
    },
    CreateProgramUseCase,
    FindAllProgramsUseCase,
    FindOneProgramUseCase,
    UpdateProgramUseCase,
    RemoveProgramUseCase,
  ],
})
export class ProgramsModule {}
