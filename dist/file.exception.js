"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidFileFormatException = void 0;
const common_1 = require("@nestjs/common");
class InvalidFileFormatException extends common_1.HttpException {
    constructor(message) {
        super({
            statusCode: 2000,
            message,
        }, 2000);
    }
}
exports.InvalidFileFormatException = InvalidFileFormatException;
