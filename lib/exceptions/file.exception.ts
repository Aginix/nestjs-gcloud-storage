import { BaseException } from './base.exception';

export class InvalidFileFormatException extends BaseException {
  constructor(message: any, stack?: any) {
    super(3001, message, stack);
  }
}

export class NoFileException extends BaseException {
  constructor(message: any, stack?: any) {
    super(3002, message, stack);
  }
}
