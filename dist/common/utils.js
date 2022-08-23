"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsonContentType = exports.isValidDate = exports.isValidJson = exports.isNotEmpty = exports.ReadableBufferStream = exports.uuid = void 0;
const stream_1 = require("stream");
const moment = require("moment-timezone");
exports.uuid = (a = '') => a
    ?
        ((Number(a) ^ (Math.random() * 16)) >> (Number(a) / 4)).toString(16)
    : `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, exports.uuid);
class ReadableBufferStream extends stream_1.Readable {
    constructor(buffer) {
        super();
        this.buffer = buffer;
        this.sent = false;
    }
    _read() {
        if (!this.sent) {
            this.push(this.buffer);
            this.sent = true;
        }
        else {
            this.push(null);
        }
    }
}
exports.ReadableBufferStream = ReadableBufferStream;
exports.isNotEmpty = (str) => {
    if (str && str.length > 0) {
        return true;
    }
    else {
        return false;
    }
};
exports.isValidJson = (str) => {
    try {
        JSON.parse(str);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.isValidDate = (date) => {
    if (date && date.length > 0) {
        return moment(date, 'YYYYMMDDHHmmss', true).isValid();
    }
    return false;
};
exports.isJsonContentType = (mimetype) => {
    if (mimetype === null || mimetype === void 0 ? void 0 : mimetype.match(/application\/json/)) {
        return true;
    }
    else {
        return false;
    }
};
