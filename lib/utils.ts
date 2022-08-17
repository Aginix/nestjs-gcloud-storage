import { Readable } from 'stream';

/**
 * https://gist.github.com/jed/982883
 * @param a
 */
export const uuid = (a: string = ''): string =>
  a
    ? /* eslint-disable no-bitwise */
      ((Number(a) ^ (Math.random() * 16)) >> (Number(a) / 4)).toString(16)
    : `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, uuid);

// buffer to readable-stream
export class ReadableBufferStream extends Readable {
  private sent = false;

  constructor(private buffer: any) {
    super();
  }

  _read() {
    if (!this.sent) {
      this.push(this.buffer);
      this.sent = true;
    } else {
      this.push(null);
    }
  }
}
