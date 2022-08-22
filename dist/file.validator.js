"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const assert = require("assert");
const fast_csv_1 = require("fast-csv");
const enums_1 = require("./enums");
const file_exception_1 = require("./file.exception");
const utils_1 = require("./utils");
const encDetector = require("detect-character-encoding");
exports.validate = (file, type) => __awaiter(void 0, void 0, void 0, function* () {
    validateFileEncoding(file === null || file === void 0 ? void 0 : file.buffer);
    validateContentType(file === null || file === void 0 ? void 0 : file.mimetype);
    yield validateFileBuffer(file === null || file === void 0 ? void 0 : file.buffer, type);
});
const validateFileEncoding = (buffer) => {
    const { encoding } = encDetector(buffer);
    if (encoding && encoding == 'UTF-8') {
        return null;
    }
    else {
        throw new file_exception_1.InvalidFileFormatException(enums_1.ERROR_MESSAGE.ENCODING_ERROR);
    }
};
const validateContentType = (mimetype) => {
    if (mimetype === null || mimetype === void 0 ? void 0 : mimetype.match(/text\/(csv)$/)) {
        return null;
    }
    else {
        throw new file_exception_1.InvalidFileFormatException(enums_1.ERROR_MESSAGE.MIME_TYPE_ERROR);
    }
};
const validateFileBuffer = (buffer, type) => __awaiter(void 0, void 0, void 0, function* () {
    const stream = new utils_1.ReadableBufferStream(buffer);
    if (type == enums_1.FileType.CATEGORY) {
        return new Promise((resolve, reject) => {
            fast_csv_1.parseStream(stream)
                .validate((row, callback) => {
                return checkFmtCate(row, callback);
            })
                .on('error', (error) => {
                reject(error);
            })
                .on('data', () => { })
                .on('data-invalid', (row, num, e) => {
                reject(new file_exception_1.InvalidFileFormatException(`${e}\n에러발생위치: ${num}행`));
            })
                .on('end', (cnt) => {
                resolve(null);
            });
        });
    }
    else if (type == enums_1.FileType.ITEM) {
        return new Promise((resolve, reject) => {
            fast_csv_1.parseStream(stream)
                .validate((row, callback) => {
                return checkFmtItem(row, callback);
            })
                .on('error', (error) => {
                reject(error);
            })
                .on('data', () => { })
                .on('data-invalid', (row, num, e) => {
                reject(new file_exception_1.InvalidFileFormatException(`${e}\n에러발생위치: ${num}행`));
            })
                .on('end', (cnt) => {
                resolve(null);
            });
        });
    }
    else if (type == enums_1.FileType.REVIEW) {
        return new Promise((resolve, reject) => {
            fast_csv_1.parseStream(stream)
                .validate((row, callback) => {
                return checkFmtRevw(row, callback);
            })
                .on('error', (error) => {
                reject(error);
            })
                .on('data', () => { })
                .on('data-invalid', (row, num, e) => {
                reject(new file_exception_1.InvalidFileFormatException(`${e}\n에러발생위치: ${num}행`));
            })
                .on('end', (cnt) => {
                resolve(null);
            });
        });
    }
    else {
        throw new file_exception_1.InvalidFileFormatException(enums_1.ERROR_MESSAGE.FILE_TYPE_ERROR);
    }
});
const checkFmtCate = (row, callback) => {
    const [category_code, category_name, created_date, last_updated_date] = row;
    try {
        assert(utils_1.isNotEmpty(category_code) && utils_1.isNotEmpty(category_name) && utils_1.isNotEmpty(created_date), `${enums_1.ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR}\n에러발생데이터: ${row}`);
        assert(utils_1.isValidDate(created_date), `${enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
        if (last_updated_date && last_updated_date.length > 0) {
            assert(utils_1.isValidDate(last_updated_date), `${enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
        }
    }
    catch (e) {
        return callback(null, false, e === null || e === void 0 ? void 0 : e.message);
    }
    return callback(null, true);
};
const checkFmtItem = (row, callback) => {
    const [item_code, category_code, title, image_url, is_deleted, created_date, last_updated_date] = row;
    try {
        assert(utils_1.isNotEmpty(item_code) && utils_1.isNotEmpty(category_code) && utils_1.isNotEmpty(title) && utils_1.isNotEmpty(image_url), `${enums_1.ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR}\n에러발생데이터: ${row}`);
        if (utils_1.isNotEmpty(is_deleted)) {
            assert(['Y', 'N'].includes(is_deleted), `${enums_1.ERROR_MESSAGE.IS_DELETED_FORMAT_ERROR}\n에러발생데이터: ${row}`);
        }
        assert(utils_1.isValidDate(created_date), `${enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
        if (utils_1.isNotEmpty(last_updated_date)) {
            assert(utils_1.isValidDate(last_updated_date), `${enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
        }
    }
    catch (e) {
        return callback(null, false, e === null || e === void 0 ? void 0 : e.message);
    }
    return callback(null, true);
};
const checkFmtRevw = (row, callback) => {
    const [item_code, review_code, review, is_deleted, filter_and_sort, created_date, last_updated_date] = row;
    try {
        assert(utils_1.isNotEmpty(item_code) && utils_1.isNotEmpty(review_code) && utils_1.isNotEmpty(review) && utils_1.isNotEmpty(created_date), `${enums_1.ERROR_MESSAGE.NOT_FOUND_REQUIRED_COL_ERROR}\n에러발생데이터: ${row}`);
        if (utils_1.isNotEmpty(is_deleted)) {
            assert(['Y', 'N'].includes(is_deleted), `${enums_1.ERROR_MESSAGE.IS_DELETED_FORMAT_ERROR}\n에러발생데이터: ${row}`);
        }
        if (utils_1.isNotEmpty(filter_and_sort)) {
            assert(utils_1.isValidJson(filter_and_sort), `${enums_1.ERROR_MESSAGE.FILTER_AND_SORT_FORMAT_ERROR}\n에러발생데이터: ${row}`);
        }
        assert(utils_1.isValidDate(created_date), `${enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
        if (utils_1.isNotEmpty(last_updated_date)) {
            assert(utils_1.isValidDate(last_updated_date), `${enums_1.ERROR_MESSAGE.DATE_FORMAT_ERROR}\n에러발생데이터: ${row}`);
        }
    }
    catch (e) {
        return callback(null, false, e === null || e === void 0 ? void 0 : e.message);
    }
    return callback(null, true);
};
