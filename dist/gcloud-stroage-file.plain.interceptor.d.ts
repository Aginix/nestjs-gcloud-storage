import { NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { GCloudStoragePerRequestOptions } from './gcloud-storage.interface';
export declare function GCloudStorageFilePlainInterceptor(
  fieldName: string,
  localOptions?: MulterOptions,
  gcloudStorageOptions?: Partial<GCloudStoragePerRequestOptions>,
  storagePath?: string,
): Type<NestInterceptor>;