import { ModuleMetadata } from '@nestjs/common/interfaces';
import { StorageOptions, CreateWriteStreamOptions } from '@google-cloud/storage';

export interface GCloudStorageOptions extends StorageOptions {
  defaultBucketname: string;
}

export interface GCloudStoragePerRequestOptions extends GCloudStorageOptions {
  /**
   * Override writeStreamOptions
   */
  writeStreamOptions?: CreateWriteStreamOptions;
}

export interface GCloudStorageModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (...args: any[]) => Promise<GCloudStorageOptions> | GCloudStorageOptions;
  inject?: any[];
}
