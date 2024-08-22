import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 } from 'uuid';

@Catch()
export class ErrorHandlingMiddleware implements ExceptionFilter {
  constructor() {}

  async catch(exception: any, host: ArgumentsHost): Promise<void> {
    const id = v4();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
    let messages: any = exception.response?.message || exception.message;
    const errorName = exception.response?.error;

    if (Array.isArray(messages)) messages = messages[0];

    console.error(messages, {
      error: exception,
      status,
      url: request.url,
      params: request.params,
      method: request.method,
      body: request.body,
      query: request.query,
    });

    response.status(status).send({
      code: status,
      error: errorName,
      errorId: id,
      messages,
    });
  }
}
