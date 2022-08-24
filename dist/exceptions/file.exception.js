"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoFileException = exports.InvalidFileFormatException = void 0;
const base_exception_1 = require("./base.exception");
class InvalidFileFormatException extends base_exception_1.BaseException {
    constructor(message, stack) {
        super(3001, message, stack);
    }
}
exports.InvalidFileFormatException = InvalidFileFormatException;
class NoFileException extends base_exception_1.BaseException {
    constructor(message, stack) {
        super(3002, message, stack);
    }
}
exports.NoFileException = NoFileException;
