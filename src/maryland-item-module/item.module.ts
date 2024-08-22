import { Module } from '@nestjs/common';
import { ItemsController } from './primary-adapters/controllers/item.controller';
import { GetMarylandItemByCodeUsecase } from './application/usecases/get-maryland-item-by-code.usecase';
import { MarylandServiceType } from './ports/maryland-service.port';
import { MarylandServiceAdapter } from './secondary-adapters/maryland-service.adapter';
import { GetMarylandItemByCodeWithResponseUsecase } from './application/usecases/controllers/get-maryland-item-by-code-with-response.usecase';

@Module({
  exports: [],
  imports: [],
  controllers: [ItemsController],
  providers: [
    GetMarylandItemByCodeUsecase,
    GetMarylandItemByCodeWithResponseUsecase,

    {
      provide: MarylandServiceType,
      useClass: MarylandServiceAdapter,
    },
  ],
})
export class ItemModule {}
