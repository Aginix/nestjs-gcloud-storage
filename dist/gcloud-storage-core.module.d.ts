import { GCloudStorageOptions, GCloudStorageAsyncOptions } from './gcloud-storage.interface';
import { DynamicModule } from '@nestjs/common';
export declare class GCloudStorageCoreModule {
  static withConfig(options: GCloudStorageOptions): DynamicModule;
  static withConfigAsync(options: GCloudStorageAsyncOptions): DynamicModule;
}
