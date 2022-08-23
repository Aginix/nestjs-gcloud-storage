import { BaseException } from './base.exception';

export class InvalidFileFormatException extends BaseException {
  constructor(message: string) {
    super(3001, message);
  }
}

export class NoFileException extends BaseException {
  constructor(message: string) {
    super(3002, message);
  }
}
