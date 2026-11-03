import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const detail = exception instanceof HttpException ? exception.getResponse() : undefined;
    const message = typeof detail === 'object' && detail !== null && 'message' in detail
      ? (detail as { message: unknown }).message
      : status === 500 ? 'Error interno del servidor.' : 'La solicitud no pudo procesarse.';
    response.status(status).json({
      statusCode: status,
      code: status === 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
