import assert = require('assert');
import { parseStream } from 'fast-csv';
import { ERROR_MESSAGE, FileType } from './enums';
import { InvalidFileFormatException } from './file.exception';
import { ReadableBufferStream } from './utils';

// type CategoryRow = {
//   category_code: string;
//   category_name: string;
//   created_date: string;
//   last_updated_date: string;
// };

// type ItemRow = {
//   item_code: string;
//   category_code: string;
//   title: string;
//   image_url: string;
//   url: string;
//   is_deleted: string;
//   created_date: string;
//   last_updated_date: string;
// };

// type ReviewRow = {
//   item_code: string;
//   review_code: string;
//   review: string;
//   is_deleted: string;
//   filter_and_sort: string;
//   created_date: string;
//   last_updated_date: string;
// };

export const validate = async (buffer: any, type: string): Promise<any> => {
  const stream = new ReadableBufferStream(buffer);
  if (type == FileType.CATEGORY) {
    return new Promise((resolve, reject) => {
      parseStream(stream)
        .validate((row, callback): void => {
          return checkFmtCate(row, callback);
        })
        .on('error', (error) => {
          reject(error);
        })
        .on('data', () => {})
        .on('data-invalid', (row, num, e) => {
          reject(new InvalidFileFormatException(`${e}\n에러발생위치: ${num}행`));
        })
        .on('end', (cnt: number) => {
          resolve(`Parsed ${cnt} rows`);
        });
    });
  } else if (type == FileType.ITEM) {
    return new Promise((resolve, reject) => {
      parseStream(stream)
        .validate((row, callback): void => {
          return checkFmtItem(row, callback);
        })
        .on('error', (error) => {
          reject(error);
        })
        .on('data', () => {})
        .on('data-invalid', (row, num, e) => {
          reject(new InvalidFileFormatException(`${e}\n에러발생위치: ${num}행`));
        })
        .on('end', (cnt: number) => {
          resolve(`Parsed ${cnt} rows`);
        });
    });
  } else if (type == FileType.REVIEW) {
    return new Promise((resolve, reject) => {
      parseStream(stream)
        .validate((row, callback): void => {
          return checkFmtRevw(row, callback);
        })
        .on('error', (error) => {
          reject(error);
        })
        .on('data', () => {})
        .on('data-invalid', (row, num, e) => {
          reject(new InvalidFileFormatException(`${e}\n에러발생위치: ${num}행`));
        })
        .on('end', (cnt: number) => {
          resolve(`Parsed ${cnt} rows`);
        });
    });
  } else {
    throw new InvalidFileFormatException(ERROR_MESSAGE.FILE_TYPE_ERR);
  }
};

const checkFmtCate = (row: any, callback: any) => {
  const [category_code, category_name, created_date, last_updated_date] = row;
  // null check
  // category_name check
  // date-fmt check
  try {
    assert(
      category_code || category_name || created_date,
      `${ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL}\n에러발생데이터: ${row}`,
    );
    assert(category_name.split('>').length > 0, `${ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL}\n에러발생데이터: ${row}`);
  } catch (e) {
    return callback(null, false, e?.message);
  }
  return callback(null, true);
};

const checkFmtItem = (row: any, callback: any) => {
  return callback(null, true);
};

const checkFmtRevw = (row: any, callback: any) => {
  return callback(null, true);
};
