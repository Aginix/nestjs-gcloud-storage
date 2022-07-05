import { DynamicModule } from '@nestjs/common';
import { GCloudStorageAsyncOptions, GCloudStorageOptions } from './gcloud-storage.interface';
export declare class GCloudStorageModule {
  static withConfig(options: GCloudStorageOptions): DynamicModule;
  static withConfigAsync(options: GCloudStorageAsyncOptions): DynamicModule;
}
