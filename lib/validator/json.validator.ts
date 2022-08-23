import { ERROR_MESSAGE, FileType } from '../common/enums';
import { InvalidFileFormatException } from '../exceptions/file.exception';
import { ReadableBufferStream } from '../common/utils';

import { chain } from 'stream-chain';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import { assertCateRow, assertItemRow, assertRevwRow } from './base.validator';

export const validateJsonFileBuffer = async (buffer: any, type: string): Promise<any> => {
  const stream = new ReadableBufferStream(buffer);
  if (type == FileType.CATEGORY) {
    return new Promise((resolve, reject) => {
      const pipeline = getPipeline(stream, checkFmtCate);
      pipeline.on('error', (e) => {
        reject(new InvalidFileFormatException(`${e?.message}`));
      });
      pipeline.on('end', () => {
        resolve(null);
      });
    });
  } else if (type == FileType.ITEM) {
    return new Promise((resolve, reject) => {
      const pipeline = getPipeline(stream, checkFmtItem);
      pipeline.on('error', (e) => {
        reject(new InvalidFileFormatException(`${e?.message}`));
      });
      pipeline.on('end', () => {
        resolve(null);
      });
    });
  } else if (type == FileType.REVIEW) {
    return new Promise((resolve, reject) => {
      const pipeline = getPipeline(stream, checkFmtRevw);
      pipeline.on('error', (e) => {
        reject(new InvalidFileFormatException(`${e?.message}`));
      });
      pipeline.on('end', () => {
        resolve(null);
      });
    });
  } else {
    throw new InvalidFileFormatException(ERROR_MESSAGE.FILE_TYPE_ERROR);
  }
};

const getPipeline = (stream: ReadableBufferStream, checker: any): chain => {
  const pipeline = chain([
    stream,
    parser(),
    streamArray(),
    (data) => {
      checker(data?.value);
    },
  ]);
  return pipeline;
};

const checkFmtCate = (row: any) => {
  assertCateRow(row, true);
};

const checkFmtItem = (row: any, resolve: any, reject: any) => {
  assertItemRow(row, true);
};

const checkFmtRevw = (row: any, resolve: any, reject: any) => {
  assertRevwRow(row, true);
};
