import { ModuleMetadata } from '@nestjs/common/interfaces';
import { StorageOptions, CreateWriteStreamOptions, PredefinedAcl } from '@google-cloud/storage';
export interface GCloudStorageOptions extends StorageOptions {
  defaultBucketname: string;
  storageBaseUri?: string;
  predefinedAcl?: PredefinedAcl;
}
export interface GCloudStoragePerRequestOptions extends GCloudStorageOptions {
  writeStreamOptions?: CreateWriteStreamOptions;
  prefix?: string;
}
export interface GCloudStorageAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (...args: any[]) => Promise<GCloudStorageOptions> | GCloudStorageOptions;
  inject?: any[];
}
