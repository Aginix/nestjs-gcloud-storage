import { HttpException } from '@nestjs/common';
export declare class InvalidFileFormatException extends HttpException {
  constructor(message: string);
}
