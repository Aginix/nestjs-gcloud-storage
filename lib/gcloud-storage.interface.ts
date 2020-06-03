import { ModuleMetadata } from '@nestjs/common/interfaces';
import { StorageOptions, CreateWriteStreamOptions, PredefinedAcl } from '@google-cloud/storage';

export interface GCloudStorageOptions extends StorageOptions {
  defaultBucketname: string;
  storageBaseUri?: string;

  /**
   * Set default predefined ACL
   * @default publicRead
   */
  predefinedAcl?: PredefinedAcl;
}

export interface GCloudStoragePerRequestOptions extends GCloudStorageOptions {
  /**
   * Override writeStreamOptions
   */
  writeStreamOptions?: CreateWriteStreamOptions;

  /**
   * Filename prefix (Folder name)
   * @example attachments
   * @example static/css
   */
  prefix?: string;
}

export interface GCloudStorageAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (...args: any[]) => Promise<GCloudStorageOptions> | GCloudStorageOptions;
  inject?: any[];
}
