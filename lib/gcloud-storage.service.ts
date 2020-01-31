import { Injectable, Inject } from '@nestjs/common';
import { join } from 'path';
import { Storage, Bucket, CreateWriteStreamOptions } from '@google-cloud/storage';

import { GCLOUD_STORAGE_MODULE_OPTIONS } from './gcloud-storage.constant';
import { GCloudStorageOptions, GCloudStoragePerRequestOptions } from './gcloud-storage.interface';
import { uuid } from './utils';

export interface UploadedFileMetadata {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: string;
  storageUrl?: string;
}

@Injectable()
export class GCloudStorageService {
  public storage: Storage = new Storage();

  constructor(@Inject(GCLOUD_STORAGE_MODULE_OPTIONS) private readonly options: GCloudStorageOptions) {
    console.log('GCloudStorageService.options', options);
  }

  get bucket(): Bucket {
    const bucketName = this.options.defaultBucketname;
    return this.storage.bucket(bucketName);
  }

  async upload(
    fileMetadata: UploadedFileMetadata,
    perRequestOptions: Partial<GCloudStoragePerRequestOptions> = null,
  ): Promise<string> {
    const filename = uuid();
    const gcFilename =
      perRequestOptions && perRequestOptions.prefix ? join(perRequestOptions.prefix, filename) : filename;
    const gcFile = this.bucket.file(gcFilename);

    // override global options with the provided ones for this request
    perRequestOptions = {
      ...this.options,
      ...perRequestOptions,
    };

    const writeStreamOptions = perRequestOptions && perRequestOptions.writeStreamOptions;

    const streamOpts: CreateWriteStreamOptions = {
      predefinedAcl: 'publicRead',
      ...writeStreamOptions,
    };

    const contentType = fileMetadata.mimetype;

    if (contentType) {
      streamOpts.metadata = { contentType };
    }

    return new Promise((resolve, reject) => {
      gcFile
        .createWriteStream(streamOpts)
        .on('error', error => reject(error))
        .on('finish', () => resolve(this.getStorageUrl(gcFilename, perRequestOptions)))
        .end(fileMetadata.buffer);
    });
  }

  getStorageUrl(filename: string, perRequestOptions: Partial<GCloudStoragePerRequestOptions> = null) {
    if (perRequestOptions && perRequestOptions.storageBaseUri) {
      return join(perRequestOptions.storageBaseUri, filename);
    }
    return 'https://storage.googleapis.com/' + join(perRequestOptions.defaultBucketname, filename);
  }
}
