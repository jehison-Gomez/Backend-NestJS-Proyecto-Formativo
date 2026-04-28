import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { RolOrmEntity } from './infrastructure/persistence/rol.orm-entity';
import { TypeOrmRolRepository } from './infrastructure/persistence/typeorm-rol.repository';
import { RolsController } from './infrastructure/http/rol.controller';

// Domain
import { RolRepository } from './domain/rol.repository';

// Application
import { RolService } from './rol.service';
import { CreateRolUseCase } from './application/use-cases/create-rol.use-case';
import { FindAllRolsUseCase } from './application/use-cases/find-all-rols.use-case';
import { FindOneRolUseCase } from './application/use-cases/find-one-rol.use-case';
import { UpdateRolUseCase } from './application/use-cases/update-rol.use-case';
import { RemoveRolUseCase } from './application/use-cases/remove-rol.use-case';

const USE_CASES = [
  CreateRolUseCase,
  FindAllRolsUseCase,
  FindOneRolUseCase,
  UpdateRolUseCase,
  RemoveRolUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([RolOrmEntity])],
  controllers: [RolsController],
  providers: [
    RolService,
    ...USE_CASES,
    {
      provide: RolRepository,
      useClass: TypeOrmRolRepository,
    },
  ],
  exports: [RolService],
})
export class RolModule {}