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
const enums_1 = require("../common/enums");
const file_exception_1 = require("../exceptions/file.exception");
const utils_1 = require("../common/utils");
const encDetector = require("detect-character-encoding");
const json_validator_1 = require("./json.validator");
const csv_validator_1 = require("./csv.validator");
exports.validate = (file, type) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const { buffer, mimetype } = file;
        validateFileEncoding(buffer);
        validateContentType(mimetype);
        if (utils_1.isJsonContentType(mimetype)) {
            return yield json_validator_1.validateJsonFileBuffer(buffer, type);
        }
        else {
            return yield csv_validator_1.validateCsvFileBuffer(buffer, type);
        }
    }
    else {
        throw new file_exception_1.NoFileException(enums_1.ERROR_MESSAGE.NO_FILE_ERROR);
    }
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
    if ((mimetype === null || mimetype === void 0 ? void 0 : mimetype.match(/text\/csv/)) || (mimetype === null || mimetype === void 0 ? void 0 : mimetype.match(/application\/json/))) {
        return null;
    }
    else {
        throw new file_exception_1.InvalidFileFormatException(enums_1.ERROR_MESSAGE.MIME_TYPE_ERROR);
    }
};
