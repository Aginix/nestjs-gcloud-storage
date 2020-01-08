import { DynamicModule, Module } from '@nestjs/common';

import { GCloudMulterStorageService } from './gcloud-multer.service';
import { GCLOUD_STORAGE_MODULE_OPTIONS } from './gcloud-storage.constant';
import { GCloudStorageOptions } from './gcloud-storage.interface';
import { GCloudStorageService } from './gcloud-storage.service';

const PUBLIC_PROVIDERS = [GCloudMulterStorageService, GCloudStorageService];

@Module({
  providers: [...PUBLIC_PROVIDERS],
  exports: [...PUBLIC_PROVIDERS, GCLOUD_STORAGE_MODULE_OPTIONS],
})
export class GCloudStorageModule {
  static withConfig(options: GCloudStorageOptions): DynamicModule {
    return {
      module: GCloudStorageModule,
      providers: [{ provide: GCLOUD_STORAGE_MODULE_OPTIONS, useValue: options }],
    };
  }
}
