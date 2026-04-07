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

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgramOrmEntity])
  ],
  controllers: [ProgramsController],
  providers: [
    // Adaptador
    TypeOrmProgramRepository,

    // Casos de uso
    {
      provide: CreateProgramUseCase,
      useFactory: (repo: TypeOrmProgramRepository) =>
        new CreateProgramUseCase(repo),
      inject: [TypeOrmProgramRepository],
    },
    {
      provide: FindAllProgramsUseCase,
      useFactory: (repo: TypeOrmProgramRepository) =>
        new FindAllProgramsUseCase(repo),
      inject: [TypeOrmProgramRepository],
    },
    {
      provide: FindOneProgramUseCase,
      useFactory: (repo: TypeOrmProgramRepository) =>
        new FindOneProgramUseCase(repo),
      inject: [TypeOrmProgramRepository],
    },
    {
      provide: UpdateProgramUseCase,
      useFactory: (repo: TypeOrmProgramRepository, findOne: FindOneProgramUseCase) =>
        new UpdateProgramUseCase(repo, findOne),
      inject: [TypeOrmProgramRepository, FindOneProgramUseCase],
    },
    {
      provide: RemoveProgramUseCase,
      useFactory: (repo: TypeOrmProgramRepository, findOne: FindOneProgramUseCase) =>
        new RemoveProgramUseCase(repo, findOne),
      inject: [TypeOrmProgramRepository, FindOneProgramUseCase],
    },
  ],
})
export class ProgramsModule {}
