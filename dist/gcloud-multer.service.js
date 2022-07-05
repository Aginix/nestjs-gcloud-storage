"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.GCloudMulterStorageService = void 0;
const common_1 = require("@nestjs/common");
const gcloud_storage_service_1 = require("./gcloud-storage.service");
let GCloudMulterStorageService = class GCloudMulterStorageService {
    constructor(gcsStorage) {
        this.gcsStorage = gcsStorage;
    }
    _handleFile(_req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const storageUrl = yield this.gcsStorage.upload(file);
            file.storageUrl = storageUrl;
            cb(null, {
                file,
            });
        });
    }
    _removeFile(_req, file, cb) {
        delete file.buffer;
        cb(null);
    }
};
GCloudMulterStorageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [gcloud_storage_service_1.GCloudStorageService])
], GCloudMulterStorageService);
exports.GCloudMulterStorageService = GCloudMulterStorageService;
