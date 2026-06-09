import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevolucionItemOrmEntity }         from './infrastructure/persistence/devolucion_item.orm-entity';
import { TypeOrmDevolucionItemRepository } from './infrastructure/persistence/typeorm-devolucion_item.repository';
import { DevolucionItemController }        from './infrastructure/http/devolucion_item.controller';
import { DevolucionItemRepository }        from './domain/devolucion_item.repository';
import { CreateDevolucionItemUseCase }     from './application/use-cases/create-devolucion_item.use-case';
import { FindAllDevolucionItemUseCase }    from './application/use-cases/find-all-devolucion_item.use-case';
import { FindOneDevolucionItemUseCase }    from './application/use-cases/find-one-devolucion_item.use-case';
import { UpdateDevolucionItemUseCase }     from './application/use-cases/update-devolucion_item.use-case';
import { RemoveDevolucionItemUseCase }     from './application/use-cases/remove-devolucion_item.use-case';

const USE_CASES = [
  CreateDevolucionItemUseCase,
  FindAllDevolucionItemUseCase,
  FindOneDevolucionItemUseCase,
  UpdateDevolucionItemUseCase,
  RemoveDevolucionItemUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([DevolucionItemOrmEntity])],
  controllers: [DevolucionItemController],
  providers: [
    ...USE_CASES,
    { provide: DevolucionItemRepository, useClass: TypeOrmDevolucionItemRepository },
  ],
  exports: [...USE_CASES, DevolucionItemRepository],
})
export class DevolucionItemModule {}
