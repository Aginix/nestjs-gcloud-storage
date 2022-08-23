import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(code: number, message: string) {
    super(
      {
        statusCode: code,
        message,
      },
      code,
    );
  }
}
