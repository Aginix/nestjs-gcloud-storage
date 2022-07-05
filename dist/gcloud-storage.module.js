"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GCloudStorageModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCloudStorageModule = void 0;
const common_1 = require("@nestjs/common");
const gcloud_storage_core_module_1 = require("./gcloud-storage-core.module");
let GCloudStorageModule = GCloudStorageModule_1 = class GCloudStorageModule {
    static withConfig(options) {
        return {
            module: GCloudStorageModule_1,
            imports: [gcloud_storage_core_module_1.GCloudStorageCoreModule.withConfig(options)],
        };
    }
    static withConfigAsync(options) {
        return {
            module: GCloudStorageModule_1,
            imports: [gcloud_storage_core_module_1.GCloudStorageCoreModule.withConfigAsync(options)],
        };
    }
};
GCloudStorageModule = GCloudStorageModule_1 = __decorate([
    common_1.Module({})
], GCloudStorageModule);
exports.GCloudStorageModule = GCloudStorageModule;
