import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import * as process from 'process';
import * as swStats from 'swagger-stats';
import { configuration } from './config/configuration';

const config = configuration();
export function initApi(app: NestExpressApplication) {
  app.enableCors();
  app.setGlobalPrefix('api', { exclude: [{ path: 'health', method: RequestMethod.GET }] });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
}

export function initDocs(app: NestExpressApplication) {
  const DOCS_UI_PATH = 'docs';
  const JSON_PATH = '/docs-json';

  const documentationBuilder = new DocumentBuilder();

  const options = documentationBuilder
    .setDescription('Web scrapper API documentation')
    .setTitle('Web scrapper API')
    .setVersion(process.env.VERSION || '1.0.0')
    .addApiKey({ in: 'header', name: config.server.apiKeyHeader, type: 'apiKey' }, 'ApiKey')

    .setExternalDoc('Postman Collection', `/${JSON_PATH}`)
    .build();

  const swaggerDocumentation = SwaggerModule.createDocument(app, options);

  app.use(
    swStats.getMiddleware({
      uriPath: '/docs/stats',
      swaggerSpec: swaggerDocumentation,
      authentication: true,
      onAuthenticate: function (req, username, password) {
        return username === config.docs.user && password === config.docs.password;
      },
    }),
  );

  app.use(
    `/${DOCS_UI_PATH}`,
    basicAuth({
      users: {
        [config.docs.user]: config.docs.password,
      },
      challenge: true,
    }),
  );

  SwaggerModule.setup(DOCS_UI_PATH, app, swaggerDocumentation, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
