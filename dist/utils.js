"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = void 0;
exports.uuid = (a = '') => a
    ?
        ((Number(a) ^ (Math.random() * 16)) >> (Number(a) / 4)).toString(16)
    : `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, exports.uuid);
