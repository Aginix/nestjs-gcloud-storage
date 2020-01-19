import { DynamicModule, Module } from '@nestjs/common';

import { GCloudStorageCoreModule } from './gcloud-storage-core.module';
import { GCloudStorageAsyncOptions, GCloudStorageOptions } from './gcloud-storage.interface';

@Module({})
export class GCloudStorageModule {
  static withConfig(options: GCloudStorageOptions): DynamicModule {
    return {
      module: GCloudStorageModule,
      imports: [GCloudStorageCoreModule.withConfig(options)],
    };
  }

  static withConfigAsync(options: GCloudStorageAsyncOptions): DynamicModule {
    return {
      module: GCloudStorageModule,
      imports: [GCloudStorageCoreModule.withConfigAsync(options)],
    };
  }
}
