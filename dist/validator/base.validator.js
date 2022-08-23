"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertRevwRow = exports.assertItemRow = exports.assertCateRow = void 0;
const assert = require("assert");
const enums_1 = require("../common/enums");
const utils_1 = require("../common/utils");
exports.assertCateRow = (row, isJson) => {
    const { category_code, category_name, created_date, last_updated_date } = getCateCols(row, isJson);
    assert(utils_1.isNotEmpty(category_code) && utils_1.isNotEmpty(category_name) && utils_1.isNotEmpty(created_date), getErrorMsg(enums_1.ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR, row));
    assert(utils_1.isValidDate(created_date), getErrorMsg(enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
    if (last_updated_date && last_updated_date.length > 0) {
        assert(utils_1.isValidDate(last_updated_date), getErrorMsg(enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
    }
};
exports.assertItemRow = (row, isJson) => {
    const { item_code, category_code, title, image_url, is_deleted, created_date, last_updated_date } = getItemCols(row, isJson);
    assert(utils_1.isNotEmpty(item_code) && utils_1.isNotEmpty(category_code) && utils_1.isNotEmpty(title) && utils_1.isNotEmpty(image_url), getErrorMsg(enums_1.ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR, row));
    if (utils_1.isNotEmpty(is_deleted)) {
        assert(['Y', 'N'].includes(is_deleted), getErrorMsg(enums_1.ERROR_MESSAGE.IS_DELETED_FORMAT_ERROR, row));
    }
    assert(utils_1.isValidDate(created_date), getErrorMsg(enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
    if (last_updated_date && last_updated_date.length > 0) {
        assert(utils_1.isValidDate(last_updated_date), getErrorMsg(enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
    }
};
exports.assertRevwRow = (row, isJson) => {
    const { item_code, review_code, review, is_deleted, filter_and_sort, created_date, last_updated_date } = getRevwCols(row, isJson);
    assert(utils_1.isNotEmpty(item_code) && utils_1.isNotEmpty(review_code) && utils_1.isNotEmpty(review) && utils_1.isNotEmpty(created_date), getErrorMsg(enums_1.ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR, row));
    if (utils_1.isNotEmpty(is_deleted)) {
        assert(['Y', 'N'].includes(is_deleted), getErrorMsg(enums_1.ERROR_MESSAGE.IS_DELETED_FORMAT_ERROR, row));
    }
    if (utils_1.isNotEmpty(filter_and_sort)) {
        assert(utils_1.isValidJson(filter_and_sort), getErrorMsg(enums_1.ERROR_MESSAGE.FILTER_AND_SORT_FORMAT_ERROR, row));
    }
    assert(utils_1.isValidDate(created_date), getErrorMsg(enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
    if (last_updated_date && last_updated_date.length > 0) {
        assert(utils_1.isValidDate(last_updated_date), getErrorMsg(enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR, row));
    }
};
const getCateCols = (row, isJson = false) => {
    if (isJson) {
        return row;
    }
    else {
        const [category_code, category_name, created_date, last_updated_date] = row;
        return {
            category_code,
            category_name,
            created_date,
            last_updated_date,
        };
    }
};
const getItemCols = (row, isJson = false) => {
    if (isJson) {
        return row;
    }
    else {
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
const getRevwCols = (row, isJson = false) => {
    if (isJson) {
        return row;
    }
    else {
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
const getErrorMsg = (message, errorRow) => {
    let errorData = null;
    if (typeof errorRow === 'object') {
        errorData = JSON.stringify(errorRow);
    }
    else {
        errorData = errorRow;
    }
    return `${message}\n---\n에러발생데이터: ${errorData}`;
};
