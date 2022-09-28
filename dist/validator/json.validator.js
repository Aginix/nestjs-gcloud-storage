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
exports.validateJsonFileBuffer = void 0;
const enums_1 = require("../common/enums");
const file_exception_1 = require("../exceptions/file.exception");
const utils_1 = require("../common/utils");
const stream_chain_1 = require("stream-chain");
const stream_json_1 = require("stream-json");
const StreamArray_1 = require("stream-json/streamers/StreamArray");
const base_validator_1 = require("./base.validator");
exports.validateJsonFileBuffer = (buffer, type) => __awaiter(void 0, void 0, void 0, function* () {
    const shape = {
        row: 0,
    };
    const stream = new utils_1.ReadableBufferStream(buffer);
    if (type == enums_1.FileType.CATEGORY) {
        return new Promise((resolve, reject) => {
            const pipeline = getPipeline(stream, checkFmtCate);
            pipeline.on('error', (e) => {
                throwError(e, reject);
            });
            pipeline.on('data', () => {
                shape.row += 1;
            });
            pipeline.on('end', () => {
                resolve(shape);
            });
        });
    }
    else if (type == enums_1.FileType.ITEM) {
        return new Promise((resolve, reject) => {
            const pipeline = getPipeline(stream, checkFmtItem);
            pipeline.on('error', (e) => {
                throwError(e, reject);
            });
            pipeline.on('data', () => {
                shape.row += 1;
            });
            pipeline.on('end', () => {
                resolve(shape);
            });
        });
    }
    else if (type == enums_1.FileType.REVIEW) {
        return new Promise((resolve, reject) => {
            const pipeline = getPipeline(stream, checkFmtRevw);
            pipeline.on('error', (e) => {
                throwError(e, reject);
            });
            pipeline.on('data', () => {
                shape.row += 1;
            });
            pipeline.on('end', () => {
                resolve(shape);
            });
        });
    }
    else {
        throw new file_exception_1.InvalidFileFormatException(enums_1.ERROR_MESSAGE.FILE_TYPE_ERROR);
    }
});
const getPipeline = (stream, checker) => {
    const pipeline = stream_chain_1.chain([
        stream,
        stream_json_1.parser(),
        StreamArray_1.streamArray(),
        (data) => {
            checker(data === null || data === void 0 ? void 0 : data.value);
            return data;
        },
    ]);
    return pipeline;
};
const throwError = (e, callback) => {
    const message = utils_1.isValidJson(e === null || e === void 0 ? void 0 : e.message) ? JSON.parse(e === null || e === void 0 ? void 0 : e.message) : e === null || e === void 0 ? void 0 : e.message;
    callback(new file_exception_1.InvalidFileFormatException(message));
};
const checkFmtCate = (row) => {
    base_validator_1.assertCateRow(row, true);
};
const checkFmtItem = (row, resolve, reject) => {
    base_validator_1.assertItemRow(row, true);
};
const checkFmtRevw = (row, resolve, reject) => {
    base_validator_1.assertRevwRow(row, true);
};
