import { parseStream } from 'fast-csv';
import { ERROR_MESSAGE, FileType } from '../common/enums';
import { InvalidFileFormatException } from '../exceptions/file.exception';
import { ReadableBufferStream } from '../common/utils';
import { assertCateRow, assertItemRow, assertRevwRow } from './base.validator';

export const validateCsvFileBuffer = async (buffer: any, type: string): Promise<any> => {
  const stream = new ReadableBufferStream(buffer);
  if (type == FileType.CATEGORY) {
    return new Promise((resolve, reject) => {
      parseStream(stream)
        .validate((row, callback): void => {
          return checkFmtCate(row, callback);
        })
        .on('error', (error) => {
          reject(new InvalidFileFormatException(getErrorMsg(ERROR_MESSAGE.PARSING_ERROR, error)));
        })
        .on('data', () => {})
        .on('data-invalid', (row, num, e) => {
          reject(new InvalidFileFormatException(`${e}\n에러발생위치: ${num}행`));
        })
        .on('end', (cnt: number) => {
          resolve(null);
        });
    });
  } else if (type == FileType.ITEM) {
    return new Promise((resolve, reject) => {
      parseStream(stream)
        .validate((row, callback): void => {
          return checkFmtItem(row, callback);
        })
        .on('error', (error) => {
          reject(new InvalidFileFormatException(getErrorMsg(ERROR_MESSAGE.PARSING_ERROR, error)));
        })
        .on('data', () => {})
        .on('data-invalid', (row, num, e) => {
          reject(new InvalidFileFormatException(`${e}\n에러발생위치: ${num}행`));
        })
        .on('end', (cnt: number) => {
          resolve(null);
        });
    });
  } else if (type == FileType.REVIEW) {
    return new Promise((resolve, reject) => {
      parseStream(stream)
        .validate((row, callback): void => {
          return checkFmtRevw(row, callback);
        })
        .on('error', (error) => {
          reject(new InvalidFileFormatException(getErrorMsg(ERROR_MESSAGE.PARSING_ERROR, error)));
        })
        .on('data', () => {})
        .on('data-invalid', (row, num, e) => {
          reject(new InvalidFileFormatException(`${e}\n에러발생위치: ${num}행`));
        })
        .on('end', (cnt: number) => {
          resolve(null);
        });
    });
  } else {
    throw new InvalidFileFormatException(ERROR_MESSAGE.FILE_TYPE_ERROR);
  }
};

const checkFmtCate = (row: any, callback: any) => {
  try {
    assertCateRow(row, false);
  } catch (e) {
    return callback(null, false, e?.message);
  }
  return callback(null, true);
};

const checkFmtItem = (row: any, callback: any) => {
  try {
    assertItemRow(row, false);
  } catch (e) {
    return callback(null, false, e?.message);
  }
  return callback(null, true);
};

const checkFmtRevw = (row: any, callback: any) => {
  try {
    assertRevwRow(row, false);
  } catch (e) {
    return callback(null, false, e?.message);
  }
  return callback(null, true);
};

const getErrorMsg = (message: string, error: any): string => {
  return `${message}\n---\n에러내용: ${error?.stack}`;
};
