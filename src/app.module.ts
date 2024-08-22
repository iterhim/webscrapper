import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { SharedModule } from './shared-module/shared.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandlingMiddleware } from './shared-module/primary-adapters/middlewares/error-handling.middleware';
import { RequestLoggerMiddleware } from './shared-module/primary-adapters/middlewares/request-logger.middleware';
import { ApiKeyMiddleware } from './shared-module/primary-adapters/middlewares/api-key-auth.middleware';
import { ItemModule } from './maryland-item-module/item.module';
import { ItemsController } from './maryland-item-module/primary-adapters/controllers/item.controller';

const healthRoute = { method: RequestMethod.GET, path: 'health' };

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    SharedModule,
    ItemModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHandlingMiddleware,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).exclude(healthRoute).forRoutes('*');
    consumer.apply(ApiKeyMiddleware).forRoutes(ItemsController);
  }
}
