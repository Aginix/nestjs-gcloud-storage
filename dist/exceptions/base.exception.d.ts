import { HttpException } from '@nestjs/common';
export declare class BaseException extends HttpException {
  constructor(code: number, message: string);
}
