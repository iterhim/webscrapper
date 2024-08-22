import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

import { IServerConfig } from '../../../config/configuration';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly serverConfig: IServerConfig;

  private readonly logger = new Logger(ApiKeyMiddleware.name);

  constructor(private configService: ConfigService) {
    this.serverConfig = this.configService.get<IServerConfig>('server');
  }

  use(req: Request, res: Response, next: NextFunction): void {
    const receivedApiKey = req.headers[this.serverConfig.apiKeyHeader];

    if (!receivedApiKey) {
      throw new UnauthorizedException(`'${this.serverConfig.apiKeyHeader}' header is required!`);
    }

    if (receivedApiKey !== this.serverConfig.apiKey) {
      this.logger.debug('Invalid API key');
      throw new UnauthorizedException('Invalid API key!');
    }

    next();
  }
}
