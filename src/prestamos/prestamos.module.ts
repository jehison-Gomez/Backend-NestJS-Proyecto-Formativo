import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { PrestamoOrmEntity }               from './infrastructure/persistence/prestamo.orm-entity';
import { TypeOrmPrestamoRepository }       from './infrastructure/persistence/typeorm-prestamo.repository';
import { PrestamosController }             from './infrastructure/http/prestamos.controller';

// Domain
import { PrestamoRepository }              from './domain/prestamo.repository';

// Use Cases
import { CreatePrestamoUseCase }           from './application/use-cases/create-prestamo.use-case';
import { FindAllPrestamosUseCase }         from './application/use-cases/find-all-prestamos.use-case';
import { FindOnePrestamoUseCase }          from './application/use-cases/find-one-prestamo.use-case';
import { UpdatePrestamoUseCase }           from './application/use-cases/update-prestamo.use-case';
import { RemovePrestamoUseCase }           from './application/use-cases/remove-prestamo.use-case';
import { UsuariosModule }                  from 'src/usuarios/usuarios.module';
import { FichasModule }                    from 'src/fichas/fichas.module';

const USE_CASES = [
  CreatePrestamoUseCase,
  FindAllPrestamosUseCase,
  FindOnePrestamoUseCase,
  UpdatePrestamoUseCase,
  RemovePrestamoUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([PrestamoOrmEntity]),
    UsuariosModule,
    FichasModule,
  ],
  controllers: [PrestamosController],
  providers: [
    ...USE_CASES,
    {
      provide:  PrestamoRepository,
      useClass: TypeOrmPrestamoRepository,
    },
  ],
  exports: [...USE_CASES],
})
export class PrestamosModule {}
