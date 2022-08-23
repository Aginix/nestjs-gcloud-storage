import { BaseException } from './base.exception';
export declare class InvalidFileFormatException extends BaseException {
  constructor(message: string);
}
export declare class NoFileException extends BaseException {
  constructor(message: string);
}
