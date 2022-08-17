import { HttpException } from '@nestjs/common';

export class InvalidFileFormatException extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: 2000,
        message,
      },
      2000,
    );
  }
}
