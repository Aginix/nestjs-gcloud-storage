import { Readable } from 'stream';
import * as moment from 'moment-timezone';

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

export const isNotEmpty = (str: string): boolean => {
  if (str && str.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const isValidDate = (date: string): boolean => {
  if (date && date.length > 0) {
    return moment(date, 'YYYYMMDDHHmmss', true).isValid();
  }
  return false;
};

export const isJsonContentType = (mimetype: string): boolean => {
  if (mimetype?.match(/application\/json/)) {
    return true;
  } else {
    return false;
  }
};
