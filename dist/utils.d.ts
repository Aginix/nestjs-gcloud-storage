/// <reference types="node" />
import { Readable } from 'stream';
export declare const uuid: (a?: string) => string;
export declare class ReadableBufferStream extends Readable {
  private buffer;
  private sent;
  constructor(buffer: any);
  _read(): void;
}
export declare const isNotEmpty: (str: string) => boolean;
export declare const isValidJson: (str: string) => boolean;
export declare const isValidDate: (date: string) => boolean;
