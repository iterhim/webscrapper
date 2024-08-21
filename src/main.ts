import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config()
import { initApi, initDocs } from './app.initializer';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  initApi(app);
  initDocs(app);
  
  await app.listen(process.env.PORT);
}
bootstrap();
