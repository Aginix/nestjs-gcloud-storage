import assert = require('assert');
import { ERROR_MESSAGE } from '../common/enums';
import { isNotEmpty, isValidDate, isValidJson } from '../common/utils';

export const assertCateRow = (row: any, isJson: boolean) => {
  const { category_code, category_name, created_date, last_updated_date } = getCateCols(row, isJson);
  assert(
    isNotEmpty(category_code) && isNotEmpty(category_name) && isNotEmpty(created_date),
    getErrorMsg(ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR, row),
  );
  assert(isValidDate(created_date), getErrorMsg(ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
  if (last_updated_date && last_updated_date.length > 0) {
    assert(isValidDate(last_updated_date), getErrorMsg(ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
  }
};

export const assertItemRow = (row: any, isJson: boolean) => {
  const { item_code, category_code, title, image_url, is_deleted, created_date, last_updated_date } = getItemCols(
    row,
    isJson,
  );
  assert(
    isNotEmpty(item_code) && isNotEmpty(category_code) && isNotEmpty(title) && isNotEmpty(image_url),
    getErrorMsg(ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR, row),
  );
  if (isNotEmpty(is_deleted)) {
    assert(['Y', 'N'].includes(is_deleted), getErrorMsg(ERROR_MESSAGE.IS_DELETED_FORMAT_ERROR, row));
  }
  assert(isValidDate(created_date), getErrorMsg(ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
  if (last_updated_date && last_updated_date.length > 0) {
    assert(isValidDate(last_updated_date), getErrorMsg(ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
  }
};

export const assertRevwRow = (row: any, isJson: boolean) => {
  const { item_code, review_code, review, is_deleted, filter_and_sort, created_date, last_updated_date } = getRevwCols(
    row,
    isJson,
  );
  assert(
    isNotEmpty(item_code) && isNotEmpty(review_code) && isNotEmpty(review) && isNotEmpty(created_date),
    getErrorMsg(ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR, row),
  );
  if (isNotEmpty(is_deleted)) {
    assert(['Y', 'N'].includes(is_deleted), getErrorMsg(ERROR_MESSAGE.IS_DELETED_FORMAT_ERROR, row));
  }
  if (isNotEmpty(filter_and_sort)) {
    assert(isValidJson(filter_and_sort), getErrorMsg(ERROR_MESSAGE.FILTER_AND_SORT_FORMAT_ERROR, row));
  }
  assert(isValidDate(created_date), getErrorMsg(ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
  if (last_updated_date && last_updated_date.length > 0) {
    assert(isValidDate(last_updated_date), getErrorMsg(ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
  }
};

const getCateCols = (row: any, isJson = false): any => {
  if (isJson) {
    return row;
  } else {
    const [category_code, category_name, created_date, last_updated_date] = row;
    return {
      category_code,
      category_name,
      created_date,
      last_updated_date,
    };
  }
};

const getItemCols = (row: any, isJson = false): any => {
  if (isJson) {
    return row;
  } else {
    const [item_code, category_code, title, image_url, url, is_deleted, created_date, last_updated_date] = row;
    return {
      item_code,
      category_code,
      title,
      image_url,
      url,
      is_deleted,
      created_date,
      last_updated_date,
    };
  }
};

const getRevwCols = (row: any, isJson = false): any => {
  if (isJson) {
    return row;
  } else {
    const [item_code, review_code, review, is_deleted, filter_and_sort, created_date, last_updated_date] = row;
    return {
      item_code,
      review_code,
      review,
      is_deleted,
      filter_and_sort,
      created_date,
      last_updated_date,
    };
  }
};

const getErrorMsg = (message: string, errorRow: any): any => {
  return JSON.stringify({
    body: message,
    detail: {
      errorRow: JSON.stringify(errorRow),
    },
  });
};
