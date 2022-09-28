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
exports.validateCsvFileBuffer = void 0;
const fast_csv_1 = require("fast-csv");
const enums_1 = require("../common/enums");
const file_exception_1 = require("../exceptions/file.exception");
const utils_1 = require("../common/utils");
const base_validator_1 = require("./base.validator");
exports.validateCsvFileBuffer = (buffer, type) => __awaiter(void 0, void 0, void 0, function* () {
    const stream = new utils_1.ReadableBufferStream(buffer);
    if (type == enums_1.FileType.CATEGORY) {
        return new Promise((resolve, reject) => {
            fast_csv_1.parseStream(stream)
                .validate((row, callback) => {
                return checkFmtCate(row, callback);
            })
                .on('error', (error) => {
                throwError(error, reject);
            })
                .on('data', () => { })
                .on('data-invalid', (row, num, e) => {
                throwError(e, reject, num);
            })
                .on('end', (cnt) => {
                resolve({
                    row: cnt,
                });
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
                throwError(error, reject);
            })
                .on('data', () => { })
                .on('data-invalid', (row, num, e) => {
                throwError(e, reject, num);
            })
                .on('end', (cnt) => {
                resolve({
                    row: cnt,
                });
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
                throwError(error, reject);
            })
                .on('data', () => { })
                .on('data-invalid', (row, num, e) => {
                throwError(e, reject, num);
            })
                .on('end', (cnt) => {
                resolve({
                    row: cnt,
                });
            });
        });
    }
    else {
        throw new file_exception_1.InvalidFileFormatException(enums_1.ERROR_MESSAGE.FILE_TYPE_ERROR);
    }
});
const throwError = (e, callback, num) => {
    if (num) {
        let message = null;
        if (utils_1.isValidJson(e)) {
            message = JSON.parse(e);
            message.detail.errorNum = num;
        }
        else {
            message = e;
        }
        callback(new file_exception_1.InvalidFileFormatException(message));
    }
    else {
        callback(new file_exception_1.InvalidFileFormatException(getErrorMsg(enums_1.ERROR_MESSAGE.PARSING_ERROR), e === null || e === void 0 ? void 0 : e.stack));
    }
};
const checkFmtCate = (row, callback) => {
    try {
        base_validator_1.assertCateRow(row, false);
    }
    catch (e) {
        return callback(null, false, e === null || e === void 0 ? void 0 : e.message);
    }
    return callback(null, true);
};
const checkFmtItem = (row, callback) => {
    try {
        base_validator_1.assertItemRow(row, false);
    }
    catch (e) {
        return callback(null, false, e === null || e === void 0 ? void 0 : e.message);
    }
    return callback(null, true);
};
const checkFmtRevw = (row, callback) => {
    try {
        base_validator_1.assertRevwRow(row, false);
    }
    catch (e) {
        return callback(null, false, e === null || e === void 0 ? void 0 : e.message);
    }
    return callback(null, true);
};
const getErrorMsg = (message) => {
    return {
        body: message,
    };
};
