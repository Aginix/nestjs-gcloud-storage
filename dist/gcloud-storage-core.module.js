"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GCloudStorageCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCloudStorageCoreModule = void 0;
const common_1 = require("@nestjs/common");
const gcloud_storage_constant_1 = require("./gcloud-storage.constant");
const gcloud_multer_service_1 = require("./gcloud-multer.service");
const gcloud_storage_service_1 = require("./gcloud-storage.service");
const PROVIDERS = [gcloud_multer_service_1.GCloudMulterStorageService, gcloud_storage_service_1.GCloudStorageService];
const EXPORTS = [...PROVIDERS];
let GCloudStorageCoreModule = GCloudStorageCoreModule_1 = class GCloudStorageCoreModule {
    static withConfig(options) {
        const gcsModuleOptions = {
            provide: gcloud_storage_constant_1.GCLOUD_STORAGE_MODULE_OPTIONS,
            useValue: options,
        };
        const gcsServiceProvider = {
            provide: gcloud_storage_service_1.GCloudStorageService,
            useFactory: (options) => new gcloud_storage_service_1.GCloudStorageService(options),
            inject: [gcloud_storage_constant_1.GCLOUD_STORAGE_MODULE_OPTIONS],
        };
        return {
            module: GCloudStorageCoreModule_1,
            providers: [gcsModuleOptions, gcloud_multer_service_1.GCloudMulterStorageService, gcsServiceProvider],
            exports: [...EXPORTS],
        };
    }
    static withConfigAsync(options) {
        const gcsServiceProvider = {
            provide: gcloud_storage_service_1.GCloudStorageService,
            useFactory: (options) => new gcloud_storage_service_1.GCloudStorageService(options),
            inject: [gcloud_storage_constant_1.GCLOUD_STORAGE_MODULE_OPTIONS],
        };
        return {
            module: GCloudStorageCoreModule_1,
            imports: options.imports,
            providers: [
                {
                    provide: gcloud_storage_constant_1.GCLOUD_STORAGE_MODULE_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                gcloud_multer_service_1.GCloudMulterStorageService,
                gcsServiceProvider,
            ],
            exports: [...EXPORTS],
        };
    }
};
GCloudStorageCoreModule = GCloudStorageCoreModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [...PROVIDERS],
        exports: [...PROVIDERS],
    })
], GCloudStorageCoreModule);
exports.GCloudStorageCoreModule = GCloudStorageCoreModule;
