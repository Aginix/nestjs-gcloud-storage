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
exports.GCloudStorageFileInterceptor = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const gcloud_storage_service_1 = require("./gcloud-storage.service");
const path_1 = require("path");
const moment = require("moment-timezone");
const validator_1 = require("./validator/validator");
function GCloudStorageFileInterceptor(fieldName, localOptions, gcloudStorageOptions, storagePath) {
    let MixinInterceptor = class MixinInterceptor {
        constructor(gcloudStorage) {
            this.gcloudStorage = gcloudStorage;
            this.interceptor = new (platform_express_1.FileInterceptor(fieldName, localOptions))();
        }
        intercept(context, next) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                (yield this.interceptor.intercept(context, next));
                const request = context.switchToHttp().getRequest();
                const file = request[fieldName];
                const { bno } = request.decoded;
                const type = (_a = request.body) === null || _a === void 0 ? void 0 : _a.type;
                const shape = yield validator_1.validate(file, type);
                let path = null;
                if (bno && type && storagePath) {
                    moment.tz.setDefault('Asia/Seoul');
                    const partition = moment().format('YYYYMMDD');
                    path = path_1.join(storagePath, `${bno}/${type}/${partition}`);
                }
                if (!file) {
                    common_1.Logger.error('GCloudStorageFileInterceptor', `Can not intercept field "${fieldName}". Did you specify the correct field name in @GCloudStorageFileInterceptor('${fieldName}')?`);
                    return;
                }
                const storageUrl = yield this.gcloudStorage.upload(file, gcloudStorageOptions, path);
                file.storageUrl = storageUrl;
                file.shape = shape;
                return next.handle();
            });
        }
    };
    MixinInterceptor = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [gcloud_storage_service_1.GCloudStorageService])
    ], MixinInterceptor);
    const Interceptor = common_1.mixin(MixinInterceptor);
    return Interceptor;
}
exports.GCloudStorageFileInterceptor = GCloudStorageFileInterceptor;
