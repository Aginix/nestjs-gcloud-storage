import assert = require('assert');
import { parseStream } from 'fast-csv';
import { ERROR_MESSAGE, FileType } from './enums';
import { InvalidFileFormatException } from './file.exception';
import { isNotEmpty, isValidDate, isValidJson, ReadableBufferStream } from './utils';

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

export const validate = async (file: any, type: string): Promise<any> => {
  validateContentType(file?.mimetype);
  await validateFileBuffer(file?.buffer, type);
};

const validateContentType = (mimetype: string) => {
  if (mimetype?.match(/text\/(csv)$/)) {
    return null;
  } else {
    throw new InvalidFileFormatException(ERROR_MESSAGE.MIME_TYPE_ERROR);
  }
};

const validateFileBuffer = async (buffer: any, type: string): Promise<any> => {
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
          reject(error);
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
          reject(error);
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
  const [category_code, category_name, created_date, last_updated_date] = row;
  try {
    assert(
      isNotEmpty(category_code) && isNotEmpty(category_name) && isNotEmpty(created_date),
      `${ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR}\n에러발생데이터: ${row}`,
    );
    // assert(category_name.split('>').length > 0, `${ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR}\n에러발생데이터: ${row}`);
    assert(isValidDate(created_date), `${ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
    if (last_updated_date && last_updated_date.length > 0) {
      assert(isValidDate(last_updated_date), `${ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
    }
  } catch (e) {
    return callback(null, false, e?.message);
  }
  return callback(null, true);
};

const checkFmtItem = (row: any, callback: any) => {
  const [item_code, category_code, title, image_url, is_deleted, created_date, last_updated_date] = row;
  try {
    assert(
      isNotEmpty(item_code) && isNotEmpty(category_code) && isNotEmpty(title) && isNotEmpty(image_url),
      `${ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR}\n에러발생데이터: ${row}`,
    );
    if (isNotEmpty(is_deleted)) {
      assert(['Y', 'N'].includes(is_deleted), `${ERROR_MESSAGE.IS_DELETED_FORMAT_ERROR}\n에러발생데이터: ${row}`);
    }
    assert(isValidDate(created_date), `${ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
    if (isNotEmpty(last_updated_date)) {
      assert(isValidDate(last_updated_date), `${ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
    }
  } catch (e) {
    return callback(null, false, e?.message);
  }
  return callback(null, true);
};

const checkFmtRevw = (row: any, callback: any) => {
  const [item_code, review_code, review, is_deleted, filter_and_sort, created_date, last_updated_date] = row;
  try {
    assert(
      isNotEmpty(item_code) && isNotEmpty(review_code) && isNotEmpty(review) && isNotEmpty(created_date),
      `${ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR}\n에러발생데이터: ${row}`,
    );
    if (isNotEmpty(is_deleted)) {
      assert(['Y', 'N'].includes(is_deleted), `${ERROR_MESSAGE.IS_DELETED_FORMAT_ERROR}\n에러발생데이터: ${row}`);
    }
    if (isNotEmpty(filter_and_sort)) {
      assert(isValidJson(filter_and_sort), `${ERROR_MESSAGE.FILTER_AND_SORT_FORMAT_ERROR}\n에러발생데이터: ${row}`);
    }
    assert(isValidDate(created_date), `${ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
    if (isNotEmpty(last_updated_date)) {
      assert(isValidDate(last_updated_date), `${ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
    }
  } catch (e) {
    return callback(null, false, e?.message);
  }
  return callback(null, true);
};
