"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = void 0;
const common_1 = require("@nestjs/common");
class BaseException extends common_1.HttpException {
    constructor(code, message, stack) {
        super(common_1.HttpException.createBody({
            statusCode: code,
            message,
            error: stack,
        }), code);
    }
}
exports.BaseException = BaseException;
