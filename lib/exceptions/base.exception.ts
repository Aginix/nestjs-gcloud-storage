import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(code: number, message: any, stack?: any) {
    super(
      HttpException.createBody({
        statusCode: code,
        message,
        error: stack,
      }),
      code,
    );
  }
}
