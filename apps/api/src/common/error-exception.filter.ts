/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericException } from './../common/generic-exception';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { FailedResponse } from '../common/ro/failed-response.ro';
import { ClassValidationParser } from '../common/parsers/class-validation.parser';
import { CommonError } from 'src/common/common.errors';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  /**
   * Transform a generic thrown exception to a `FailedResponse`
   *
   * @param exception: An exception caught by the handler
   * @returns A failed response object
   */
  transformHttpException(exception: Error): FailedResponse {
    const exceptionMessage: any = exception.message;

    return {
      errorType:
        exceptionMessage.error ||
        (exception as any).response?.error ||
        CommonError.INTERNAL_ERROR.errorType,

      errorMessage:
        exceptionMessage.message ||
        (exception as any).response?.message ||
        CommonError.INTERNAL_ERROR.errorMessage,

      /** If local, return the full error message body */
      errorDetails: {},
    };
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const request = ctx.getRequest();
    /** Flat error if it was wrapped inside another error */
    const flattenedException =
      typeof exception.message === 'object' &&
      typeof (exception.message as any).message === 'object'
        ? exception.message
        : exception;

    const privateKeys: string[] = ['password'];
    const body = typeof request.body === 'object' ? JSON.stringify(request.body) : request.body;
    privateKeys.forEach(key => {
      if (body[key]) {
        delete body[key];
      }
    });

    // Log errors
    this.logger.error({ status, stack: exception.stack, body }, null, 'ExceptionFilter');

    if (ClassValidationParser.isClassValidatorException(flattenedException)) {
      response
        .status(status)
        .json(ClassValidationParser.transformClassValidatorException(flattenedException));
    } else {
      response.status(status).json(this.transformHttpException(flattenedException));
    }
  }
}
