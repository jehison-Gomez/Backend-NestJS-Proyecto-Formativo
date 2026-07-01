import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { FichaOrmEntity }               from './infrastructure/persistence/ficha.orm-entity';
import { TypeOrmFichaRepository }       from './infrastructure/persistence/typeorm-ficha.repository';
import { FichasController }                from './infrastructure/http/fichas.controller';

// Domain
import { FichaRepository }              from './domain/ficha.repository';

// Use Cases
import { CreateFichaUseCase }           from './application/use-cases/create-ficha.use-case';
import { FindAllFichasUseCase }         from './application/use-cases/find-all-fichas.use-case';
import { FindOneFichaUseCase }          from './application/use-cases/find-one-ficha.use-case';
import { UpdateFichaUseCase }           from './application/use-cases/update-ficha.use-case';
import { RemoveFichaUseCase }                     from './application/use-cases/remove-ficha.use-case';
import { FindMaterialesDisponiblesUseCase }        from './application/use-cases/find-materiales-disponibles.use-case';
import { FindAprendicesByFichaUseCase }            from './application/use-cases/find-aprendices-by-ficha.use-case';
import { ProgramasModule }                         from 'src/programas/programas.module';
import { UsuariosModule }                          from 'src/usuarios/usuarios.module';
import { AuthModule }                              from 'src/auth/auth.module';

const USE_CASES = [
  CreateFichaUseCase,
  FindAllFichasUseCase,
  FindOneFichaUseCase,
  UpdateFichaUseCase,
  RemoveFichaUseCase,
  FindMaterialesDisponiblesUseCase,
  FindAprendicesByFichaUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([FichaOrmEntity]),
    forwardRef(() => ProgramasModule),
    forwardRef(() => UsuariosModule),
    AuthModule,
  ],
  controllers: [FichasController],
  providers: [
    ...USE_CASES,
    {
      provide:  FichaRepository,
      useClass: TypeOrmFichaRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class FichasModule {}
